import { GetFunctionCommand, LambdaClient } from "@aws-sdk/client-lambda";
import { parse } from "@aws-sdk/util-arn-parser";
import chalk from "chalk";
const client = new LambdaClient({});
const getFunctionNameFromResource = (resource: string) =>
  resource.replace("function:", "");

export interface Data {
  name?: string;
  description?: string;
  AWS: {
    Arn: string | undefined;
    FunctionName: string | undefined;
    MemorySize: number | undefined;
    Handler: string | undefined;
    Runtime: string | undefined;
    CodeSize: number | undefined;
    Description: string | undefined;
    LastModified: string | undefined;
    Account: string;
    Service: string;
  };
}

// Code that runs to get information about the resource.
export const getData = async (arn: string): Promise<Data> => {
  const { resource, accountId } = parse(arn);
  const functionName = getFunctionNameFromResource(resource);

  console.log(
    chalk.cyan(`Fetching data for Lambda Function: ${functionName}....`),
  );

  const response = await client.send(
    new GetFunctionCommand({
      FunctionName: functionName,
    }),
  );

  return {
    name: response.Configuration?.FunctionName,
    description: response.Configuration?.Description || "AWS lambda function",
    AWS: {
      Arn: response.Configuration?.FunctionArn,
      FunctionName: response.Configuration?.FunctionName,
      MemorySize: response.Configuration?.MemorySize,
      Runtime: response.Configuration?.Runtime,
      Handler: response.Configuration?.Handler,
      CodeSize: response.Configuration?.CodeSize,
      Description: response.Configuration?.Description,
      LastModified: response.Configuration?.LastModified,
      Account: accountId,
      Service: "lambda",
    },
  };
};

// Return the default markdown for new resources
export const getMarkdown = (data: Data): Promise<string> => {
  return Promise.resolve(`
### Trigger function using the AWS-CLI

<CLICommand>aws lambda invoke --function-name /FunctionName/ </CLICommand>

### Overview

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ligula et orci pellentesque volutpat. In imperdiet augue sit amet imperdiet ultricies. Etiam eget dui elementum, tempor ligula quis, consectetur eros. Suspendisse sodales mattis ex, nec tempor lorem. Maecenas eget risus suscipit, gravida lectus eu, dictum sapien. Nunc efficitur sem eget dui tempus aliquam. 
    `);
};
export const getFileName = (data: Data): Promise<string> => {
  const name = data.AWS.FunctionName || `new-${data.AWS.Service}-file`;
  return Promise.resolve(name);
};
