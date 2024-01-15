import {
  SNSClient,
  GetTopicAttributesCommand,
} from "@aws-sdk/client-sns";
import { parse } from "@aws-sdk/util-arn-parser";
// import chalk from "chalk";
const client = new SNSClient({});

export interface Data {
  name?: string;
  description?: string;
  AWS: {
    Arn: string;
    Account: string;
    Service: string;
  };
}

// arn:aws:dynamodb:us-west-2:123456789123:table/boynestore-users

// Code that runs to get information about the resource.
export const getData = async (arn: string): Promise<Data> => {
  const { resource, accountId } = parse(arn);

  const response = await client.send(
    new GetTopicAttributesCommand({
      TopicArn: arn
    }),
  );

  console.log(JSON.stringify(response, null, 4))


  return {
    name: 'Random',
    description: response.Attributes?.DisplayName || "SNS Topic",
    AWS: {
      Arn: arn,
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
  const name = data.name || `new-${data.name}-file`;
  return Promise.resolve(name);
};
