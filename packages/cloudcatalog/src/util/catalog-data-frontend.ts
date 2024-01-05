import { Resource } from "@/types";

export const getResourceName = (resource: Resource) => {
  if (resource.name) return resource.name;
  switch (resource.AWS.Service) {
    case "lambda":
      return resource.AWS.FunctionName;
    case "step-function":
      return resource.AWS.Name;
    default:
      return "ResouceName";
  }
};
