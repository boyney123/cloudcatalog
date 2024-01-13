import {
  DynamoDBClient,
  DescribeTableCommand,
  TableStatus,
  StreamSpecification,
  ProvisionedThroughput,
  ProvisionedThroughputDescription,
  AttributeDefinition,
} from "@aws-sdk/client-dynamodb";
import { parse } from "@aws-sdk/util-arn-parser";
// import chalk from "chalk";
const client = new DynamoDBClient({});

export interface Data {
  name?: string;
  description?: string;
  AWS: {
    Arn: string;
    TableName?: string;
    CreationDateTime: string | undefined;
    TableStatus: string | undefined;
    DeletionProtectionEnabled?: boolean;
    TableSizeBytes?: number | undefined;
    StreamSpecification?: StreamSpecification;
    ProvisionedThroughput?: ProvisionedThroughputDescription;
    AttributeDefinitions?: AttributeDefinition[];
    Account: string;
    Service: string;
  };
}

// arn:aws:dynamodb:us-west-2:123456789123:table/boynestore-users

// Code that runs to get information about the resource.
export const getData = async (arn: string): Promise<Data> => {
  const { resource, accountId } = parse(arn);
  const tableName = resource.split("table/")[1];

  const response = await client.send(
    new DescribeTableCommand({
      TableName: tableName,
    }),
  );

  const creationDate = response.Table?.CreationDateTime;

  console.log("response", JSON.stringify(response, null, 4));

  return {
    name: response.Table?.TableName,
    description: "DynamoDB Table",
    AWS: {
      Arn: arn,
      TableName: response.Table?.TableName,
      CreationDateTime: creationDate
        ? response.Table?.CreationDateTime?.toISOString()
        : undefined,
      DeletionProtectionEnabled: response.Table?.DeletionProtectionEnabled,
      TableStatus: response.Table?.TableStatus,
      TableSizeBytes: response.Table?.TableSizeBytes,
      StreamSpecification: response.Table?.StreamSpecification,
      ProvisionedThroughput: {
        ReadCapacityUnits:
          response?.Table?.ProvisionedThroughput?.ReadCapacityUnits,
        WriteCapacityUnits:
          response?.Table?.ProvisionedThroughput?.WriteCapacityUnits,
      },
      AttributeDefinitions: response.Table?.AttributeDefinitions,
      Account: accountId,
      Service: "dynamodb",
    },
  };
};

// Return the default markdown for new resources
export const getMarkdown = (data: Data): Promise<string> => {
  return Promise.resolve(`
## About this table

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ligula et orci pellentesque volutpat. In imperdiet augue sit amet imperdiet ultricies. Etiam eget dui elementum, tempor ligula quis, consectetur eros. Suspendisse sodales mattis ex, nec tempor lorem. Maecenas eget risus suscipit, gravida lectus eu, dictum sapien. Nunc efficitur sem eget dui tempus aliquam. 

    `);
};
export const getFileName = (data: Data): Promise<string> => {
  const name = data.AWS.TableName || `new-${data.AWS.TableName}-file`;
  return Promise.resolve(name);
};
