import { parse } from "@aws-sdk/util-arn-parser";

// Works for Lambda for now. Add more in future
export const getConsoleURL = (arn: string) => {
  const { accountId, region, service, resource } = parse(arn);

  switch (service) {
    case "lambda":
      const functionName = resource.split(":")[1];
      return `https://console.aws.amazon.com/lambda/home?region=${region}#/functions/${functionName}`;
    case "states":
      return `https://console.aws.amazon.com/states/home?region=${region}#/statemachines/view/${encodeURIComponent(
        arn,
      )}`;
  }
};
