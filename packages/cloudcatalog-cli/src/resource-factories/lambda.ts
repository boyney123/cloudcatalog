import { LambdaClient, GetFunctionCommand } from "@aws-sdk/client-lambda";
import { ResourceBase } from "./resource";
import chalk from "chalk";

const client = new LambdaClient({});

const defaultMarkdown = `
### Trigger this lambda function using the AWS-CLI

<CLICommand>aws lambda invoke --function-name /FunctionName/ </CLICommand>

### Overview

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ligula et orci pellentesque volutpat. In imperdiet augue sit amet imperdiet ultricies. Etiam eget dui elementum, tempor ligula quis, consectetur eros. Suspendisse sodales mattis ex, nec tempor lorem. Maecenas eget risus suscipit, gravida lectus eu, dictum sapien. Nunc efficitur sem eget dui tempus aliquam. Aenean ultricies porta velit. Quisque tempus in nisl nec pulvina

`;

const getFunctionNameFromResource = (resource: string) =>
  resource.replace("function:", "");

export class LambdaResource extends ResourceBase {
  constructor(arn: string) {
    super(arn);
    this.fileName = getFunctionNameFromResource(this.resource);
    this.defaultMarkdown = defaultMarkdown.trim();
  }

  // Function fetch any lambda information required....
  async fetchData() {
    const functionName = getFunctionNameFromResource(this.resource);

    console.log(
      chalk.cyan(`Fetching data for Lambda Function: ${functionName}....`),
    );

    const response = await client.send(
      new GetFunctionCommand({
        FunctionName: functionName,
      }),
    );

    this.data = {
      AWS: {
        Arn: response.Configuration?.FunctionArn,
        FunctionName: response.Configuration?.FunctionName,
        MemorySize: response.Configuration?.MemorySize,
        Runtime: response.Configuration?.Runtime,
        Handler: response.Configuration?.Handler,
        CodeSize: response.Configuration?.CodeSize,
        Description: response.Configuration?.Description,
        LastModified: response.Configuration?.LastModified,
        Account: this.accountId,
        Service: "lambda",
      },
    };

    this.fileName = response.Configuration?.FunctionName;
  }
}
