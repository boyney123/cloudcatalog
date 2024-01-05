#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";

import { validate } from "@aws-sdk/util-arn-parser";
import {
  getServiceFromArn,
  isServiceSupportedByCatalog,
} from "./utils/cli-helpers";
import resources from "./resources";
import { writeResourceToCatalog } from "./utils/file-system";

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

      if (!isServiceSupportedByCatalog(ARN)) {
        console.error(`Given service is not supported yet by CloudCatalog`);
        process.exit(1);
      }

      const service = getServiceFromArn(ARN);
      const resource = resources[service];

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
        service,
      });

      return;
    },
  )
  .demandCommand(1)
  .parse();
