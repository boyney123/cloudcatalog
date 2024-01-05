// Mock send function
const sendMock = jest.fn();
import { getData, getFileName, getMarkdown } from "../../src/resources/states";

// Mocking AWS SDK
jest.mock("@aws-sdk/client-sfn", () => {
  return {
    SFNClient: jest.fn(() => ({
      send: sendMock,
    })),
    DescribeStateMachineCommand: jest.fn(),
  };
});

const DescribeStateMachineCommandMockResponse = {
  name: "MyStateMachine",
  status: "ACTIVE",
  type: "STANDARD",
  creationDate: new Date("2022-01-01"),
  loggingConfiguration: {
    level: "OFF",
  },
};

describe("lambda resource", () => {
  beforeEach(() => {
    sendMock.mockClear();
    sendMock.mockResolvedValue(DescribeStateMachineCommandMockResponse);
  });

  describe("getData", () => {
    it("returns data about the given state machine (arn)", async () => {
      const result = await getData(
        "arn:aws:states:us-west-2:123456789123:stateMachine:MyStateMachine",
      );

      console.log(JSON.stringify(result, null, 4));

      expect(result).toEqual({
        name: "MyStateMachine",
        description: "AWS Step Function",
        AWS: {
          Arn: "arn:aws:states:us-west-2:123456789123:stateMachine:MyStateMachine",
          Name: "MyStateMachine",
          Status: "ACTIVE",
          Type: "STANDARD",
          CreationDate: "2022-01-01T00:00:00.000Z",
          LoggingConfiguration: "OFF",
          Account: "123456789123",
          Service: "step-function",
        },
      });
    });
  });

  describe("getMarkdown", () => {
    it("returns default markdown content for new resources", async () => {
      const data = await getData(
        "arn:aws:states:us-west-2:123456789123:stateMachine:MyStateMachine",
      );
      const result = await getMarkdown(data);

      // @ts-ignore
      expect(result).toMatchMarkdown(`
## About this state machine

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ligula et orci pellentesque volutpat. In imperdiet augue sit amet imperdiet ultricies. Etiam eget dui elementum, tempor ligula quis, consectetur eros. Suspendisse sodales mattis ex, nec tempor lorem. Maecenas eget risus suscipit, gravida lectus eu, dictum sapien. Nunc efficitur sem eget dui tempus aliquam. 

### Start execution command

<CLICommand>aws stepfunctions start-execution --state-machine-arn /Arn/ --input "\{\\"key\\":\\"value\\"\}"</CLICommand>  
      `);
    });
  });

  describe("getFileName", () => {
    it("returns the lambda function name as the file name", async () => {
      const data = await getData(
        "arn:aws:states:us-west-2:123456789123:stateMachine:MyStateMachine",
      );
      const result = await getFileName(data);
      expect(result).toEqual("MyStateMachine");
    });
  });
});
