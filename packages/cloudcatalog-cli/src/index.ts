#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";

import { validate } from "@aws-sdk/util-arn-parser";
import { isServiceSupportedByCatalog, parseArn } from "./utils/cli-helpers";
import resources from "./resources";
import { writeResourceToCatalog } from "./utils/file-system";

const arnServiceToFriendlyServiceName = (service: string) => {
  if (service === "states") return "step-function";
  return service;
};

yargs(hideBin(process.argv))
  .command(
    "import-resource <arn>",
    "import the given ARN and parse it into a markdown file for your CloudCatalog",
    () => {},
    async (argv) => {
      const ARN = argv.arn as string;

      try {
        if (!validate(ARN)) {
          // Nice erorr message here....
          console.error("Invalid ARN given");
          return process.exit(1);
        }
      } catch (error) {
        return process.exit(1);
      }

      const { service, accountId, resource: arnResource } = parseArn(ARN);
      let resource = resources[service];

      // No integration found for CloudCatalog just generic import for now.
      if (!resource) {
        resource = resources.generic;
      }

      console.log(
        chalk.cyan(`Importing your ${service} resource into your catalog...`),
      );

      const data = await resource.getData(ARN);
      const markdown = await resource.getMarkdown(data);
      const fileName = await resource.getFileName(data);

      await writeResourceToCatalog({
        data,
        markdown,
        fileName,
        service: arnServiceToFriendlyServiceName(service),
        resource: arnResource,
        accountId,
      });

      return;
    },
  )
  .demandCommand(1)
  .parse();
