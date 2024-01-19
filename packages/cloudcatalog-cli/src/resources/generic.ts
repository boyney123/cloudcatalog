import { parse } from "@aws-sdk/util-arn-parser";
// import chalk from "chalk";

export interface Data {
  name?: string;
  description?: string;
  AWS: {
    Arn: string;
    Account: string;
    Service: string;
  };
  catalog: {
    generic: boolean;
  };
}

// Code that runs to get information about the resource.
export const getData = async (arn: string): Promise<Data> => {
  const { resource, accountId, service } = parse(arn);

  // Some resouces like apprunner come back like service/{app}/a0b4839c972747c0befbd0ed2ee178cb
  // need to make them friendly for the app
  const parsedResource = resource.replace(/\//g, "-");

  return {
    name: parsedResource,
    description: `${service} resource`,
    AWS: {
      Arn: arn,
      Account: accountId,
      Service: service,
    },
    catalog: {
      // Tell cloudcatalog that this resource has not been enriched.
      generic: true,
    },
  };
};

// Return the default markdown for new resources
export const getMarkdown = (data: Data): Promise<string> => {
  return Promise.resolve(`
## About this resource

Write a description about this resource to help you or your teams. You can use any markdown properties here you want or code examples.

#### Example JSON 

Embed any code you want into this markdown
\`\`\`json
{
  "AWS": {
    "Arn": "${data.AWS.Arn}",
    "Account": "${data.AWS.Account}",
    "Service": "${data.AWS.Service}"
  }
}
\`\`\`

#### Example CLI commands

Embed any CLI commands directly into your documentation to help developers.

<CLICommand>ls -a</CLICommand>


    `);
};
export const getFileName = (data: Data): Promise<string> => {
  const name = data.name || `new-${data.AWS.Service}-file`;
  return Promise.resolve(name);
};
