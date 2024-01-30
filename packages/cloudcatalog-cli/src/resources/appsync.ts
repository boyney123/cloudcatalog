import { GetGraphqlApiCommand, AppSyncClient } from "@aws-sdk/client-appsync";
import { parse } from "@aws-sdk/util-arn-parser";
import chalk from "chalk";
const client = new AppSyncClient({});
const getApiIdFromResource = (resource: string) =>
  resource.split("/").pop();

export interface Data {
  name?: string;
  description?: string;
  AWS: {
    Arn: string | undefined;
    Name: string | undefined;
    ApiId: string | undefined;
    AuthenticationType: string | undefined;
    ApiType: string | undefined;
    Endpoint: string | undefined;
    Account: string;
    Service: string;
  };
}

// Code that runs to get information about the resource.
export const getData = async (arn: string): Promise<Data> => {
  const { resource, accountId } = parse(arn);
  const apiId = getApiIdFromResource(resource);

  console.log(
    chalk.cyan(`Fetching data for AppSync API: ${apiId}....`),
  );

  const response = await client.send(
    new GetGraphqlApiCommand({
      apiId: apiId,
    }),
  );

  return {
    name: response.graphqlApi?.name,
    description: "AWS AppSync API",
    AWS: {
      Arn: response.graphqlApi?.arn,
      Name: response.graphqlApi?.name,
      ApiId: response.graphqlApi?.apiId,
      AuthenticationType: response.graphqlApi?.authenticationType,
      ApiType: response.graphqlApi?.apiType,
      Endpoint: response.graphqlApi?.uris?.GRAPHQL,
      Account: accountId,
      Service: "appsync",
    },
  };
};

// Return the default markdown for new resources
export const getMarkdown = (data: Data): Promise<string> => {
  return Promise.resolve(`
### Describe an AppSync API using the AWS-CLI

<CLICommand>aws appsync get-graphql --api-id /ApiId/ </CLICommand>

### Overview

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ligula et orci pellentesque volutpat. In imperdiet augue sit amet imperdiet ultricies. Etiam eget dui elementum, tempor ligula quis, consectetur eros. Suspendisse sodales mattis ex, nec tempor lorem. Maecenas eget risus suscipit, gravida lectus eu, dictum sapien. Nunc efficitur sem eget dui tempus aliquam. 
    `);
};
export const getFileName = (data: Data): Promise<string> => {
  const name = data.AWS.Name || `new-${data.AWS.Service}-file`;
  return Promise.resolve(name);
};
