import { ARN, parse } from "@aws-sdk/util-arn-parser";

const supportedServices = ["lambda"];

export const isServiceSupportedByCatalog = (arn: string) => {
  const { resource, service } = parse(arn);
  return supportedServices.includes(service);
};
