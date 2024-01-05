import {
  DescribeStateMachineCommand,
  SFNClient,
  LogLevel,
} from "@aws-sdk/client-sfn";
import { parse } from "@aws-sdk/util-arn-parser";
// import chalk from "chalk";
const client = new SFNClient({});

export interface Data {
  name?: string;
  description?: string;
  AWS: {
    Arn: string;
    Name: string | undefined;
    Status: string | undefined;
    CreationDate: string | undefined;
    Type: string | undefined;
    LoggingConfiguration: LogLevel | undefined;
    Account: string;
    Service: string;
  };
}

// Code that runs to get information about the resource.
export const getData = async (arn: string): Promise<Data> => {
  const { resource, accountId } = parse(arn);
  // const functionName = getFunctionNameFromResource(resource);

  const response = await client.send(
    new DescribeStateMachineCommand({
      stateMachineArn: arn,
    }),
  );

  return {
    name: response.name,
    description: "AWS Step Function",
    AWS: {
      Arn: arn,
      Name: response.name,
      Status: response.status,
      Type: response.type,
      CreationDate: `${response.creationDate?.toISOString()}`,
      LoggingConfiguration: response?.loggingConfiguration?.level,
      Account: accountId,
      Service: "step-function",
    },
  };
};

// Return the default markdown for new resources
export const getMarkdown = (data: Data): Promise<string> => {
  return Promise.resolve(`
## About this state machine

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ligula et orci pellentesque volutpat. In imperdiet augue sit amet imperdiet ultricies. Etiam eget dui elementum, tempor ligula quis, consectetur eros. Suspendisse sodales mattis ex, nec tempor lorem. Maecenas eget risus suscipit, gravida lectus eu, dictum sapien. Nunc efficitur sem eget dui tempus aliquam. 

### Start execution command

<CLICommand>aws stepfunctions start-execution --state-machine-arn /Arn/ --input "\{\\"key\\":\\"value\\"\}"</CLICommand>  
    `);
};
export const getFileName = (data: Data): Promise<string> => {
  const name = data.AWS.Name || `new-${data.AWS.Service}-file`;
  return Promise.resolve(name);
};
