import * as path from "path";
import fs from "fs-extra";
import { parse, validate } from "@aws-sdk/util-arn-parser";
import YAML from "yamljs";
import json2md from "json2md";
import matter from "gray-matter";

const DIR = process.cwd();
const RESOURCE_DIR = path.join(DIR, "data", "resources");

const readMarkdownFile = (pathToFile: string) => {
  const file = fs.readFileSync(pathToFile, {
    encoding: "utf-8",
  });
  return {
    parsed: matter(file),
    raw: file,
  };
};

const getResourceFromPath = (pathToResource: string) => {
  if (!fs.existsSync(pathToResource)) {
    return null;
  }

  const { parsed, raw } = readMarkdownFile(pathToResource);
  return {
    data: parsed.data,
    content: parsed.content,
    raw,
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
const buildMarkdownFile = ({
  frontMatterObject,
  customContent,
  includeSchemaComponent = false,
}: {
  frontMatterObject: any;
  customContent?: string;
  includeSchemaComponent?: boolean;
}) => {
  const customJSON2MD = (content: any) => {
    json2md.converters.schema = (render) => (render ? "<Schema />" : "");
    return json2md(content);
  };

  const content = [{ schema: includeSchemaComponent }];

  // console.log(JSON.stringify(frontMatterObject, null, 4))

  return `---
${YAML.stringify(frontMatterObject, 10)}---
${customContent || customJSON2MD(content)}`;
};

export const writeResource = async (
  arn: string,
  frontMatterObject: any,
  defaultMarkDown: string,
) => {
  const pathToResource = path.join(
    RESOURCE_DIR,
    frontMatterObject.AWS.Service,
    `${frontMatterObject.catalog.path}.mdx`,
  );

  // Try and get information from the file first, before we override it...
  const existingFile = getResourceFromPath(pathToResource);
  const fileContent = existingFile ? existingFile.content : defaultMarkDown;
  const {
    AWS = {},
    catalog = {},
    ...customProps
  } = (existingFile?.data as any) || {};

  // Write new markdown file with exisiting custom data from user, but also update AWS and Catalog information
  const file = buildMarkdownFile({
    frontMatterObject: {
      ...frontMatterObject,
      ...customProps,
    },
    customContent: fileContent,
  });

  fs.outputFileSync(
    path.join(
      RESOURCE_DIR,
      frontMatterObject.AWS.Service,
      `${frontMatterObject.catalog.path}.mdx`,
    ),
    file,
  );

  console.log(
    "Written file to",
    path.join(
      RESOURCE_DIR,
      frontMatterObject.AWS.Service,
      `${frontMatterObject.catalog.path}.mdx`,
    ),
  );
};
