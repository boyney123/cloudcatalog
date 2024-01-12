// Mock send function
const sendMock = jest.fn();
import {
  getData,
  getFileName,
  getMarkdown,
} from "../../src/resources/dynamodb";

// Mocking AWS SDK
jest.mock("@aws-sdk/client-dynamodb", () => {
  return {
    DynamoDBClient: jest.fn(() => ({
      send: sendMock,
    })),
    DescribeTableCommand: jest.fn(),
  };
});

const DescribeTableMock = {
  Arn: "arn:aws:dynamodb:us-west-2:123456789123:table/user-payments",
  TableName: "user-payments",
  CreationDateTime: new Date("2022-09-15T09:56:47.097Z"),
  DeletionProtectionEnabled: false,
  TableStatus: "ACTIVE",
  TableSizeBytes: 76,
  StreamSpecification: {
    StreamEnabled: true,
    StreamViewType: "NEW_AND_OLD_IMAGES",
  },
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  AttributeDefinitions: [
    {
      AttributeName: "id",
      AttributeType: "S",
    },
  ],
  Service: "dynamodb",
  AccountId: 123456789123,
};

describe("dynamodb resource", () => {
  beforeEach(() => {
    sendMock.mockClear();
    sendMock.mockImplementation(() => ({
      Table: DescribeTableMock,
    }));
  });

  describe("getData", () => {
    it("returns data about the given DynamoDB arn", async () => {
      const result = await getData(
        "arn:aws:dynamodb:us-west-2:123456789123:table/user-payments",
      );

      expect(result).toEqual({
        name: "user-payments",
        description: "DynamoDB Table",
        AWS: {
          Arn: "arn:aws:dynamodb:us-west-2:123456789123:table/user-payments",
          TableName: "user-payments",
          CreationDateTime: "2022-09-15T09:56:47.097Z",
          DeletionProtectionEnabled: false,
          TableStatus: "ACTIVE",
          TableSizeBytes: 76,
          StreamSpecification: {
            StreamEnabled: true,
            StreamViewType: "NEW_AND_OLD_IMAGES",
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          Account: "123456789123",
          Service: "dynamodb",
        },
      });
    });
  });

  describe("getMarkdown", () => {
    it("returns default markdown content for new resources", async () => {
      const data = await getData(
        "arn:aws:dynamodb:us-west-2:123456789123:table/user-payments",
      );
      const result = await getMarkdown(data);

      // @ts-ignore
      expect(result).toMatchMarkdown(`## About this table

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ligula et orci pellentesque volutpat. In imperdiet augue sit amet imperdiet ultricies. Etiam eget dui elementum, tempor ligula quis, consectetur eros. Suspendisse sodales mattis ex, nec tempor lorem. Maecenas eget risus suscipit, gravida lectus eu, dictum sapien. Nunc efficitur sem eget dui tempus aliquam.`);
    });
  });

  describe("getFileName", () => {
    it("returns the DynamoDB Table name name as the file name", async () => {
      const data = await getData(
        "arn:aws:dynamodb:us-west-2:123456789123:table/user-payments",
      );
      const result = await getFileName(data);
      expect(result).toEqual("user-payments");
    });
  });
});
