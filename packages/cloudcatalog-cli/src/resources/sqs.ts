import {
  SQSClient,
  GetQueueAttributesCommand,
  GetQueueUrlCommand,
} from "@aws-sdk/client-sqs";
import { parse } from "@aws-sdk/util-arn-parser";
const client = new SQSClient({});

export interface Data {
  name?: string;
  description?: string;
  AWS: {
    Arn: string;
    Name: string;
    CreatedTimestamp: string | undefined;
    VisibilityTimeout: number | undefined;
    MaximumMessageSize: number | undefined;
    MessageRetentionPeriod: number | undefined;
    ReceiveMessageWaitTimeSeconds: string | undefined;
    DelaySeconds: string | undefined;
    SqsManagedSseEnabled: string | undefined;
    QueueUrl: string | undefined;
    Account: string;
    Service: string;
  };
}

// Code that runs to get information about the resource.
export const getData = async (arn: string): Promise<Data> => {
  const { resource, accountId } = parse(arn);

  const getQueueUrlResponse = await client.send(
    new GetQueueUrlCommand({
      QueueName: resource,
    }),
  );

  const getQueueAttributesResponse = await client.send(
    new GetQueueAttributesCommand({
      QueueUrl: getQueueUrlResponse.QueueUrl,
      AttributeNames: ["All"],
    }),
  );

  const attributes = getQueueAttributesResponse?.Attributes || {};

  const createdTimeStamp = attributes?.CreatedTimestamp
    ? parseInt(attributes?.CreatedTimestamp)
    : undefined;
  const parseAttribute = (attribute: any) =>
    attribute ? parseInt(attribute) || undefined : undefined;

  return {
    name: resource,
    description: "SQS Queue",
    AWS: {
      Arn: arn,
      Name: resource,
      CreatedTimestamp: createdTimeStamp
        ? new Date(createdTimeStamp * 1000).toISOString()
        : undefined,
      VisibilityTimeout: parseAttribute(attributes.VisibilityTimeout),
      MaximumMessageSize: parseAttribute(attributes.MaximumMessageSize),
      MessageRetentionPeriod: parseAttribute(attributes.MessageRetentionPeriod),
      DelaySeconds: attributes.DelaySeconds,
      ReceiveMessageWaitTimeSeconds: attributes.ReceiveMessageWaitTimeSeconds,
      SqsManagedSseEnabled: attributes.SqsManagedSseEnabled,
      QueueUrl: getQueueUrlResponse.QueueUrl,
      Account: accountId,
      Service: "sqs",
    },
  };
};

// Return the default markdown for new resources
export const getMarkdown = (data: Data): Promise<string> => {
  return Promise.resolve(`
## About this SQS queue

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ligula et orci pellentesque volutpat. In imperdiet augue sit amet imperdiet ultricies. Etiam eget dui elementum, tempor ligula quis, consectetur eros. Suspendisse sodales mattis ex, nec tempor lorem. Maecenas eget risus suscipit, gravida lectus eu, dictum sapien. Nunc efficitur sem eget dui tempus aliquam. 

### Send a message to the SQS queue

<CLICommand>aws sqs send-message --queue-url /QueueUrl/ --message-body "Hello, this is a test message"</CLICommand> 
    `);
};
export const getFileName = (data: Data): Promise<string> => {
  const name = data.AWS.Name || `new-${data.AWS.Service}-file`;
  return Promise.resolve(name);
};
