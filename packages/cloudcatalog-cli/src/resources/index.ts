import * as lambda from "./lambda";
import * as states from "./states";

type ResourceData = lambda.Data | states.Data;

interface Resource {
  getData: (arn: string) => Promise<any>;
  getFileName: (data: ResourceData) => Promise<string>;
  getMarkdown: (data: ResourceData) => Promise<string>;
}

export default {
  lambda,
  states,
} as Record<string, Resource>;
