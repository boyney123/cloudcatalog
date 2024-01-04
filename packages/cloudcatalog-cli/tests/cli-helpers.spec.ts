import { isServiceSupportedByCatalog } from "../src/utils/cli-helpers";

describe("cli-helpers", () => {
  describe("isServiceSupportedByCatalog", () => {
    it("returns true when the given ARN is a lambda ARN", () => {
      const arn = "arn:aws:lambda:us-west-2:1234567891234:function:my-function";
      expect(isServiceSupportedByCatalog(arn)).toEqual(true);
    });

    it("returns false when the given ARN is not a lambda ARN", () => {
      const arn = "arn:aws:events:us-west-2:1234567891234:event-bus/bus";
      expect(isServiceSupportedByCatalog(arn)).toEqual(false);
    });
  });
});
