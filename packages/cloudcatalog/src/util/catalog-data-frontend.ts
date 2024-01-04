import { LambdaResource, Resource } from "@/types";

export const getResourceName = (resource: Resource | LambdaResource) => {
  if (resource.name) return resource.name;
  return resource.AWS.FunctionName;
};
