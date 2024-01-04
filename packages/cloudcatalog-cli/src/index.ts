#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";

import { validate } from "@aws-sdk/util-arn-parser";

import { LambdaResource } from "./resource-factories/lambda";
import { isServiceSupportedByCatalog } from "./utils/cli-helpers";

const buildResource = async (arn: string): Promise<any> => {
  return new LambdaResource(arn);
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

      if (!isServiceSupportedByCatalog(ARN)) {
        console.error(`Given service is not supported yet by CloudCatalog`);
        process.exit(1);
      }

      console.log(chalk.cyan("Importing resource into catalog..."));

      // const { resource, service } = parse(ARN);
      const resource = await buildResource(ARN);
      await resource.importToCatalog();

      return;
    },
  )
  .demandCommand(1)
  .parse();
