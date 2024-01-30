import {
  parseArn,
  isServiceSupportedByCatalog,
} from "../src/utils/cli-helpers";

describe("cli-helpers", () => {
  describe("isServiceSupportedByCatalog", () => {
    it("returns true when the given service is supported", () => {
      const service = "lambda";
      expect(isServiceSupportedByCatalog(service)).toEqual(true);
    });

    it("returns false when the given service is not an enriched service", () => {
      const service = "apprunner";
      expect(isServiceSupportedByCatalog(service)).toEqual(false);
    });
  });
  describe("parseArn", () => {
    it("returns the service, accountId, and resource of a given arn", () => {
      const arn = "arn:aws:lambda:us-west-2:1234567891234:function:my-function";
      const result = parseArn(arn);
      expect(result.accountId).toEqual("1234567891234");
      expect(result.service).toEqual("lambda");
      expect(result.resource).toEqual("function:my-function");
    });
  });
});
