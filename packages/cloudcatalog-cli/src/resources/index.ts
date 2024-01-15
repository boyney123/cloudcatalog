import * as lambda from "./lambda";
import * as states from "./states";
import * as sqs from "./sqs";
import * as dynamodb from "./dynamodb";
import * as sns from "./sns";

type ResourceData = lambda.Data | states.Data | sqs.Data | dynamodb.Data | sns.Data;

interface Resource {
  getData: (arn: string) => Promise<any>;
  getFileName: (data: ResourceData) => Promise<string>;
  getMarkdown: (data: ResourceData) => Promise<string>;
}

export default {
  lambda,
  states,
  sqs,
  dynamodb,
  sns
} as Record<string, Resource>;
