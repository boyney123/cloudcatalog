const cwdMock = jest.fn(() => "test");
import * as path from "path";
import fs from "fs-extra";
import { writeResourceToCatalog } from "../src/utils/file-system";
const pathToExampleCatalog = path.join(__dirname, "./data/example-catalog");

jest.mock("process", () => ({
  cwd: cwdMock,
}));

describe("file-system util", () => {
  describe("writeResourceToCatalog", () => {
    beforeEach(() => {
      if (fs.existsSync(path.join(pathToExampleCatalog, "data", "resources"))) {
        fs.rmdirSync(path.join(pathToExampleCatalog, "data", "resources"), {
          recursive: true,
        });
      }

      const mockCurrentDate = new Date("2020-01-01T00:00:00Z");
      //@ts-ignore
      global.Date = jest.fn(() => mockCurrentDate);
      //@ts-ignore
      global.Date.toISOString = jest.fn(() => "2020-01-01T00:00:00.000Z");
    });

    it("throws an error if no catalog can be found in the current directory", async () => {
      cwdMock.mockImplementationOnce(() => "random-dir");

      expect(() =>
        writeResourceToCatalog({
          data: { test: true },
          fileName: "my-lambda-function",
          markdown: "Hello World",
          service: "lambda",
        }),
      ).toThrow(
        "Failed to find a catalog. Please re-run this command in the root directory of your catalog.",
      );
    });

    it("writes the resource to the expected folder based on the filename and service", async () => {
      cwdMock.mockImplementationOnce(() => pathToExampleCatalog);

      console.log('pathToExampleCatalog', pathToExampleCatalog)

      writeResourceToCatalog({
        data: { test: true },
        fileName: "my-lambda-function",
        markdown: "Hello World",
        service: "lambda",
      });

      expect(
        fs.existsSync(
          path.join(
            pathToExampleCatalog,
            "data",
            "resources",
            "lambda",
            `my-lambda-function.md`,
          ),
        ),
      ).toBeTruthy();
    });

    it("only the AWS information in the resource is set when a resource is already defined in catalog", async () => {
      cwdMock.mockImplementationOnce(() => pathToExampleCatalog);

      const exampleFile = `---
AWS:
  FunctionName: function-name
  MemorySize: 1024
  Runtime: nodejs16.x
  Handler: index.handler
  CodeSize: 210432
  Description: My Awesome Function
  Account: account-id
  Service: lambda
catalog:
  updatedAt: '2020-01-01T00:00:00.000Z'
  parent: lambda
  path: function-name
---
My Awesome Custom content`;

      fs.outputFileSync(
        path.join(
          pathToExampleCatalog,
          "data",
          "resources",
          "lambda",
          "function-name.md",
        ),
        exampleFile,
      );

      writeResourceToCatalog({
        data: {
          AWS: {
            Arn: "arn:aws:lambda:region:account-id:function:function-name",
            FunctionName: "function-name",
            MemorySize: 1024,
            Runtime: "nodejs18.x",
            Handler: "index.handler",
            LastModified: "2020-01-01T00:00:00",
            CodeSize: 510432,
            Description: "This is updated",
            Account: "account-id",
            Service: "lambda",
          },
          description: "My Awesome Function",
          name: "function-name",
        },
        fileName: "function-name",
        markdown:
          "This markdown should not override the markdown already in the document",
        service: "lambda",
      });

      const fileContents = fs.readFileSync(
        path.join(
          pathToExampleCatalog,
          "data",
          "resources",
          "lambda",
          `function-name.md`,
        ),
        { encoding: "utf-8" },
      );

      // @ts-ignore
      expect(fileContents).toMatchMarkdown(`---
AWS:
    Arn: arn:aws:lambda:region:account-id:function:function-name
    FunctionName: function-name
    MemorySize: 1024
    Runtime: nodejs18.x
    Handler: index.handler
    LastModified: '2020-01-01T00:00:00'
    CodeSize: 510432
    Description: This is updated
    Account: account-id
    Service: lambda
description: My Awesome Function
name: function-name  
catalog:
    updatedAt: '2020-01-01T00:00:00.000Z'
    parent: lambda
    path: function-name
---

My Awesome Custom content`);
    });
  });
});
