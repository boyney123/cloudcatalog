import { parse } from "@aws-sdk/util-arn-parser";
import fs from "fs-extra";
import * as path from "path";
import process from "process";
import yaml from "js-yaml";
import matter from "gray-matter";
import chalk from "chalk";

export interface Resource {
  // function to get any data you need
  importToCatalog: () => {};
  fetchData: () => {};
}

export class ResourceBase implements Resource {
  service: string;
  resource: string;
  arn: string;
  accountId: string;
  data: any;
  fileName: any;
  public defaultMarkdown: string;

  constructor(arn: string) {
    const { service, resource, accountId } = parse(arn);
    this.service = service;
    this.resource = resource;
    this.accountId = accountId;
    this.defaultMarkdown = "";
    this.fileName = arn;
    this.arn = arn;
  }

  async parseArn(arn: string) {
    return parse(this.arn);
  }

  async fetchData() {}

  async writeToCatalog() {
    // Assuem user is using CLI in the current project DIR
    const PROJECT_DIR = process.cwd();
    const catalogFileName = "cloudcatalog.config.js";
    const pathToFile = path.join(
      PROJECT_DIR,
      "data",
      "resources",
      this.service,
      `${this.fileName}.md`,
    );

    if (!fs.existsSync(path.join(PROJECT_DIR, catalogFileName))) {
      throw new Error(
        "Failed to find a catalog. Please re-run this command in the root directory of your catalog.",
      );
    }

    const frontmatter = yaml.dump({
      ...this.data,
      catalog: {
        updatedAt: new Date().toISOString(),
        parent: this.service,
        path: this.fileName,
      },
    });

    let markdown = this.defaultMarkdown;

    // Does the file already exist?
    if (fs.existsSync(pathToFile)) {
      console.log(
        chalk.cyan(
          `Found resource for ${this.fileName} already. Just updating the dynamic content...`,
        ),
      );
      const rawFile = fs.readFileSync(pathToFile, "utf-8");
      const parsedContent = matter(rawFile);
      markdown = parsedContent.content;
    }

    const file = `---\n${frontmatter}---\n\n${markdown}`;

    console.log(
      chalk.green(
        `New resource for ${this.service} added to your catalog (${this.fileName}.md)`,
      ),
    );
    fs.outputFileSync(pathToFile, file);
  }
  async importToCatalog() {
    await this.fetchData();
    await this.writeToCatalog();
  }
  async convertDataToFrontMatter() {
    // Convert any data to frontmatter
  }
}
