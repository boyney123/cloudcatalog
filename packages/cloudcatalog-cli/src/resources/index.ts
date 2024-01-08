import * as lambda from "./lambda";
import * as states from "./states";
import * as sqs from "./sqs";

type ResourceData = lambda.Data | states.Data | sqs.Data;

interface Resource {
  getData: (arn: string) => Promise<any>;
  getFileName: (data: ResourceData) => Promise<string>;
  getMarkdown: (data: ResourceData) => Promise<string>;
}

export default {
  lambda,
  states,
  sqs,
} as Record<string, Resource>;
