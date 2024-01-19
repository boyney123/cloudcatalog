// Mock send function
import { getData, getFileName, getMarkdown } from "../../src/resources/generic";

describe("generic resource", () => {
  describe("getData", () => {
    it("returns data for any AWS resource that is not natively supported", async () => {
      const result = await getData(
        "arn:aws:apprunner:us-west-2:123456789123:service/next-app/85bf138c24cc4cbea8d2dd4cdfd7819f",
      );

      expect(result).toEqual({
        name: "service-next-app-85bf138c24cc4cbea8d2dd4cdfd7819f",
        description: "apprunner resource",
        AWS: {
          Arn: "arn:aws:apprunner:us-west-2:123456789123:service/next-app/85bf138c24cc4cbea8d2dd4cdfd7819f",
          Account: "123456789123",
          Service: "apprunner",
        },
        catalog: {
          generic: true,
        },
      });
    });
  });

  describe("getMarkdown", () => {
    it("returns default markdown content for generic resources", async () => {
      const data = await getData(
        "arn:aws:apprunner:us-west-2:123456789123:service/next-app/85bf138c24cc4cbea8d2dd4cdfd7819f",
      );
      const result = await getMarkdown(data);

      console.log(result);

      // @ts-ignore
      expect(result).toMatchMarkdown(`## About this resource

      Write a description about this resource to help you or your teams. You can use any markdown properties here you want or code examples.
  
      #### Example JSON
  
      Embed any code you want into this markdown
      \`\`\`json
      {
        "AWS": {
          "Arn": "arn:aws:apprunner:us-west-2:123456789123:service/next-app/85bf138c24cc4cbea8d2dd4cdfd7819f",
          "Account": "123456789123",
          "Service": "apprunner"
        }
      }
      \`\`\`
  
      #### Example CLI commands
  
      Embed any CLI commands directly into your documentation to help developers.
  
      <CLICommand>ls -a</CLICommand>`);
    });
  });

  describe("getFileName", () => {
    it("returns the resource name as the file name", async () => {
      const data = await getData(
        "arn:aws:apprunner:us-west-2:123456789123:service/next-app/85bf138c24cc4cbea8d2dd4cdfd7819f",
      );
      const result = await getFileName(data);
      expect(result).toEqual(
        "service-next-app-85bf138c24cc4cbea8d2dd4cdfd7819f",
      );
    });
  });
});
