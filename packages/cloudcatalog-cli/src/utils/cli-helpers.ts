import { ARN, parse } from "@aws-sdk/util-arn-parser";

const supportedServices = ["lambda"];

export const isServiceSupportedByCatalog = (arn: string) => {
  const { service } = parse(arn);
  return supportedServices.includes(service);
};

export const getServiceFromArn = (arn: string) => {
  const { service } = parse(arn);
  return service;
};
