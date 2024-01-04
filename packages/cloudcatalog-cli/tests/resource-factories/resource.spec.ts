/**
 * Using the Lambda resource as the example, but here we test the BaseResource class
 * and it's functionality
 */

const sendMock = jest.fn(() => {});
const cwdMock = jest.fn(() => "test");
import { LambdaResource } from "../../src/resource-factories/lambda";
import * as path from "path";
import fs from "fs-extra";

const pathToExampleCatalog = path.join(__dirname, "./data/example-catalog");

// Mocking AWS SDK
jest.mock("@aws-sdk/client-lambda", () => {
  return {
    LambdaClient: jest.fn(() => ({
      send: sendMock,
    })),
    GetFunctionCommand: jest.fn(() => ({
      response: {
        Configration: {
          FunctionName: "Testing",
        },
      },
    })),
  };
});

jest.mock("process", () => ({
  cwd: cwdMock,
}));

describe("resource", () => {
  let lambdaResource: LambdaResource;
  const mockArn = "arn:aws:lambda:region:account-id:function:function-name";

  beforeEach(() => {
    lambdaResource = new LambdaResource(mockArn);
    sendMock.mockClear();
    if (fs.existsSync(path.join(pathToExampleCatalog, "data", "resources"))) {
      fs.rmSync(path.join(pathToExampleCatalog, "data", "resources"), {
        recursive: true,
      });
    }

    const mockCurrentDate = new Date("2020-01-01T00:00:00Z");
    //@ts-ignore
    global.Date = jest.fn(() => mockCurrentDate);
    //@ts-ignore
    global.Date.toISOString = jest.fn(() => "2020-01-01T00:00:00.000Z");
  });

  describe("writeToCatalog", () => {
    it("throws an error if no catalog can be found in the current directory", async () => {
      await expect(lambdaResource.writeToCatalog()).rejects.toThrow(
        "Failed to find a catalog. Please re-run this command in the root directory of your catalog.",
      );
    });

    it("writes the resource to the expected folder based on the resource type", async () => {
      sendMock.mockImplementationOnce(() => ({
        Configuration: {
          FunctionName: "function-name",
          MemorySize: 1024,
          Runtime: "nodejs16.x",
          Handler: "index.handler",
          Description: "My Awesome Function",
          CodeSize: 210432,
        },
      }));

      // Give it path to a real folder, we can use the catalog example dir

      cwdMock.mockImplementationOnce(() => pathToExampleCatalog);

      await lambdaResource.fetchData();
      await lambdaResource.writeToCatalog();

      expect(
        fs.existsSync(
          path.join(
            pathToExampleCatalog,
            "data",
            "resources",
            "lambda",
            `${lambdaResource.data.AWS.FunctionName}.mdx`,
          ),
        ),
      ).toBeTruthy();

      const fileContents = fs.readFileSync(
        path.join(
          pathToExampleCatalog,
          "data",
          "resources",
          "lambda",
          `${lambdaResource.data.AWS.FunctionName}.mdx`,
        ),
        { encoding: "utf-8" },
      );
      expect(fileContents).toMatch(`---
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
  parent: lambda
  path: function-name
---

### Trigger this lambda function using the AWS-CLI

<CLICommand>aws lambda invoke --function-name /FunctionName/ </CLICommand>

### Overview

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ligula et orci pellentesque volutpat. In imperdiet augue sit amet imperdiet ultricies. Etiam eget dui elementum, tempor ligula quis, consectetur eros. Suspendisse sodales mattis ex, nec tempor lorem. Maecenas eget risus suscipit, gravida lectus eu, dictum sapien. Nunc efficitur sem eget dui tempus aliquam. Aenean ultricies porta velit. Quisque tempus in nisl nec pulvina`);

      // Verify the file is in the project....
    });

    it.only("only the AWS information in the resource is set when a resource is already defined in catalog", async () => {
      // Add an example file into the project first.

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
          "function-name.mdx",
        ),
        exampleFile,
      );

      sendMock.mockImplementationOnce(() => ({
        Configuration: {
          FunctionName: "function-name",
          MemorySize: 512,
          Runtime: "nodejs18.x",
          Handler: "index.handler",
          Description: "This is updated",
          CodeSize: 510432,
        },
      }));

      cwdMock.mockImplementationOnce(() => pathToExampleCatalog);

      await lambdaResource.fetchData();
      await lambdaResource.writeToCatalog();

      expect(
        fs.existsSync(
          path.join(
            pathToExampleCatalog,
            "data",
            "resources",
            "lambda",
            `${lambdaResource.data.AWS.FunctionName}.mdx`,
          ),
        ),
      ).toBeTruthy();

      const fileContents = fs.readFileSync(
        path.join(
          pathToExampleCatalog,
          "data",
          "resources",
          "lambda",
          `${lambdaResource.data.AWS.FunctionName}.mdx`,
        ),
        { encoding: "utf-8" },
      );

      // @ts-ignore
      expect(fileContents).toMatchMarkdown(`---
        AWS:
          FunctionName: function-name
          MemorySize: 512
          Runtime: nodejs18.x
          Handler: index.handler
          CodeSize: 510432
          Description: This is updated
          Account: account-id
          Service: lambda
        catalog:
          updatedAt: '2020-01-01T00:00:00.000Z'
          parent: lambda
          path: function-name
        ---
        My Awesome Custom content`);
    });
  });
});
