// Mock send function
const sendMock = jest.fn();
import { getData, getFileName, getMarkdown } from "../../src/resources/lambda";

// Mocking AWS SDK
jest.mock("@aws-sdk/client-lambda", () => {
  return {
    LambdaClient: jest.fn(() => ({
      send: sendMock,
    })),
    GetFunctionCommand: jest.fn(),
  };
});

const GetFunctionCommandMockResponse = {
  FunctionArn: "arn:aws:lambda:region:account-id:function:function-name",
  FunctionName: "function-name",
  MemorySize: 1024,
  Runtime: "nodejs16.x",
  Handler: "index.handler",
  LastModified: "2020-01-01T00:00:00",
  CodeSize: 210432,
  Description: "My Awesome Function",
};

describe("lambda resource", () => {
  beforeEach(() => {
    sendMock.mockClear();
    sendMock.mockResolvedValue({
      Configuration: GetFunctionCommandMockResponse,
    });
  });

  describe("getData", () => {
    it("returns data about the given lambda function (arn)", async () => {
      const result = await getData(GetFunctionCommandMockResponse.FunctionArn);
      expect(result).toEqual({
        AWS: {
          Arn: "arn:aws:lambda:region:account-id:function:function-name",
          FunctionName: "function-name",
          MemorySize: 1024,
          Runtime: "nodejs16.x",
          Handler: "index.handler",
          LastModified: "2020-01-01T00:00:00",
          CodeSize: 210432,
          Description: "My Awesome Function",
          Account: "account-id",
          Service: "lambda",
        },
        description: "My Awesome Function",
        name: "function-name",
      });
    });
  });

  describe("getMarkdown", () => {
    it("returns default markdown content for new resources", async () => {
      const data = await getData(GetFunctionCommandMockResponse.FunctionArn);
      const result = await getMarkdown(data);

      // @ts-ignore
      expect(result).toMatchMarkdown(`### Trigger function using the AWS-CLI

      <CLICommand>aws lambda invoke --function-name /FunctionName/ </CLICommand>
      
      ### Overview
      
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ligula et orci pellentesque volutpat. In imperdiet augue sit amet imperdiet ultricies. Etiam eget dui elementum, tempor ligula quis, consectetur eros. Suspendisse sodales mattis ex, nec tempor lorem. Maecenas eget risus suscipit, gravida lectus eu, dictum sapien. Nunc efficitur sem eget dui tempus aliquam. `);
    });
  });

  describe("getFileName", () => {
    it("returns the lambda function name as the file name", async () => {
      const data = await getData(GetFunctionCommandMockResponse.FunctionArn);
      const result = await getFileName(data);
      expect(result).toEqual("function-name");
    });
  });
});
