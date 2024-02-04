import { ARN, parse } from "@aws-sdk/util-arn-parser";

const supportedServices = ["lambda", "states", "sqs", "dynamodb", "appsync"];

export const isServiceSupportedByCatalog = (service: string) => {
  return supportedServices.includes(service);
};

export const parseArn = (arn: string) => {
  const { service, resource, accountId } = parse(arn);
  return { service, resource, accountId };
};
