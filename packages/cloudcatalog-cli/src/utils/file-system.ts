import { parse } from "@aws-sdk/util-arn-parser";
import fs from "fs-extra";
import * as path from "path";
import process from "process";
import yaml from "js-yaml";
import matter from "gray-matter";
import chalk from "chalk";

interface WriteOptions {
  service: string;
  fileName: string;
  data: any;
  markdown: string;
}

export const writeResourceToCatalog = ({
  service,
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

  console.log("pathToFile", path.join(PROJECT_DIR, catalogFileName));

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
    },
  });

  const file = `---\n${frontmatter}---\n\n${markdown}`;

  console.log(
    chalk.green(`

      ⭐️ New resource added for ${service} added to your catalog (${fileName}.md)

      👉 View your new resource: http://localhost:3000/resources/${service}/${fileName}
      
      `),
  );
  fs.outputFileSync(pathToFile, file);
};
