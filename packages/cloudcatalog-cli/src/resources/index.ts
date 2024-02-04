import * as lambda from "./lambda";
import * as states from "./states";
import * as sqs from "./sqs";
import * as dynamodb from "./dynamodb";
import * as appsync from "./appsync";
import * as generic from "./generic";

type ResourceData =
  | lambda.Data
  | states.Data
  | sqs.Data
  | dynamodb.Data
  | appsync.Data
  | generic.Data;

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
  appsync,
  generic,
} as Record<string, Resource>;
