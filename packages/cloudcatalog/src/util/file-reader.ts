import * as path from "path";
import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";

export const readMarkdownFile = (pathToFile: string) => {
  const rawFile = fs.readFileSync(pathToFile);
  return serialize(rawFile, {
    parseFrontmatter: true,
    mdxOptions: {
      development: false,
    },
  });
};
