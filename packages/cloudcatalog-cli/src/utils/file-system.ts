import { parse } from "@aws-sdk/util-arn-parser";
import fs from "fs-extra";
import * as path from "path";
import process from "process";
import yaml from "js-yaml";
import matter from "gray-matter";
import chalk from "chalk";
import { isServiceSupportedByCatalog } from "./cli-helpers";

interface WriteOptions {
  service: string;
  accountId: string;
  resource: string;
  fileName: string;
  data: any;
  markdown: string;
}

export const writeResourceToCatalog = ({
  service,
  accountId,
  resource,
  fileName,
  data,
  markdown: defaultMarkdown,
}: WriteOptions) => {
  const PROJECT_DIR = process.cwd();
  const catalogFileName = "cloudcatalog.config.js";
  const pathToFile = path.join(
    PROJECT_DIR,
    "data",
    "resources",
    service,
    `${fileName}.md`,
  );

  if (!fs.existsSync(path.join(PROJECT_DIR, catalogFileName))) {
    throw new Error(
      "Failed to find a catalog. Please re-run this command in the root directory of your catalog.",
    );
  }

  let markdown = defaultMarkdown;
  let fileData = data;

  // Does the file already exist?
  if (fs.existsSync(pathToFile)) {
    console.log(
      chalk.cyan(
        `Found resource for ${fileName} already. Just updating the dynamic content...`,
      ),
    );
    const rawFile = fs.readFileSync(pathToFile, "utf-8");
    const parsedContent = matter(rawFile);
    const existingFrontMatter = parsedContent.data;
    const { AWS, catalog, ...userGeneratedContent } = existingFrontMatter;
    markdown = parsedContent.content;
    fileData = {
      ...fileData,
      ...userGeneratedContent,
    };
  }

  let frontmatter = yaml.dump({
    ...fileData,
    catalog: {
      updatedAt: new Date().toISOString(),
      parent: service,
      path: fileName,
      // tells cloudcatalog if the content has been enriched or not.
      generic: fileData?.catalog?.generic || false,
    },
  });

  const file = `---\n${frontmatter}---\n\n${markdown}`;

  const serviceEnriched = isServiceSupportedByCatalog(service);

  console.log(
    chalk.green(`

⭐️ New resource has been added to your CloudCatalog.

service: ${service}
resource: ${resource}
accountId: ${accountId}

📄 Filename: ${fileName}.md

${
  serviceEnriched
    ? `🔗 This resource has been enriched read more: \n https://www.cloudcatalog.dev/docs/category/${resource}`
    : "⚠️  This resource has not been enriched. Want to help and contribute? \n https://www.cloudcatalog.dev/docs/overview/guides/resources/AWS/All%20other%20resources/contributing"
}

👉 View your new resource 
http://localhost:3000/resources/${service}/${fileName}

      `),
  );
  fs.outputFileSync(pathToFile, file);
};
