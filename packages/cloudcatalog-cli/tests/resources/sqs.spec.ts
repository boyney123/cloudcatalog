// Mock send function
const sendMock = jest.fn();
import { getData, getFileName, getMarkdown } from "../../src/resources/sqs";

// Mocking AWS SDK
jest.mock("@aws-sdk/client-sqs", () => {
  return {
    SQSClient: jest.fn(() => ({
      send: sendMock,
    })),
    GetQueueAttributesCommand: jest.fn(),
    GetQueueUrlCommand: jest.fn(() => ({
      QueueUrl:
        "https://sqs.us-west-2.amazonaws.com/123456789123/PaymentProcessingQueue",
    })),
  };
});

const GetQueueAttributesCommandMock = {
  FunctionArn: "arn:aws:sqs:us-west-2:123456789123:PaymentProcessingQueue",
  Name: "PaymentProcessingQueue",
  CreatedTimestamp: 1663761771,
  VisibilityTimeout: 960,
  MaximumMessageSize: 262144,
  MessageRetentionPeriod: 345600,
  DelaySeconds: "0",
  ReceiveMessageWaitTimeSeconds: "0",
  SqsManagedSseEnabled: "false",
  QueueUrl:
    "https://sqs.us-west-2.amazonaws.com/123456789123/PaymentProcessingQueue",
  Account: "123456789123",
  Service: "sqs",
};

describe("lambda resource", () => {
  beforeEach(() => {
    sendMock.mockClear();
    sendMock.mockResolvedValueOnce({
      QueueUrl:
        "https://sqs.us-west-2.amazonaws.com/123456789123/PaymentProcessingQueue",
    });
    sendMock.mockResolvedValueOnce({
      Attributes: GetQueueAttributesCommandMock,
    });
  });

  describe("getData", () => {
    it("returns data about the given SQS queue", async () => {
      const result = await getData(
        "arn:aws:sqs:us-west-2:123456789123:PaymentProcessingQueue",
      );
      expect(result).toEqual({
        AWS: {
          Arn: "arn:aws:sqs:us-west-2:123456789123:PaymentProcessingQueue",
          Name: "PaymentProcessingQueue",
          CreatedTimestamp: "2022-09-21T12:02:51.000Z",
          VisibilityTimeout: 960,
          MaximumMessageSize: 262144,
          MessageRetentionPeriod: 345600,
          DelaySeconds: "0",
          ReceiveMessageWaitTimeSeconds: "0",
          SqsManagedSseEnabled: "false",
          QueueUrl:
            "https://sqs.us-west-2.amazonaws.com/123456789123/PaymentProcessingQueue",
          Account: "123456789123",
          Service: "sqs",
        },
        description: "SQS Queue",
        name: "PaymentProcessingQueue",
      });
    });
  });

  describe("getMarkdown", () => {
    it("returns default markdown content for new resources", async () => {
      const data = await getData(
        "arn:aws:sqs:us-west-2:123456789123:PaymentProcessingQueue",
      );
      const result = await getMarkdown(data);

      // @ts-ignore
      expect(result).toMatchMarkdown(`## About this SQS queue

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ligula et orci pellentesque volutpat. In imperdiet augue sit amet imperdiet ultricies. Etiam eget dui elementum, tempor ligula quis, consectetur eros. Suspendisse sodales mattis ex, nec tempor lorem. Maecenas eget risus suscipit, gravida lectus eu, dictum sapien. Nunc efficitur sem eget dui tempus aliquam. 
      
      ### Send a message to the SQS queue
      
      <CLICommand>aws sqs send-message --queue-url /QueueUrl/ --message-body "Hello, this is a test message"</CLICommand> `);
    });
  });

  describe("getFileName", () => {
    it("returns the SQS name as the file name", async () => {
      const data = await getData(
        "arn:aws:sqs:us-west-2:123456789123:PaymentProcessingQueue",
      );
      const result = await getFileName(data);
      expect(result).toEqual("PaymentProcessingQueue");
    });
  });
});
