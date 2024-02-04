// Mock send function
const sendMock = jest.fn();
import { getData, getFileName, getMarkdown } from "../../src/resources/appsync";

// Mocking AWS SDK
jest.mock("@aws-sdk/client-appsync", () => {
  return {
    AppSyncClient: jest.fn(() => ({
      send: sendMock,
    })),
    GetGraphqlApiCommand: jest.fn(),
  };
});

const GetGraphqlApiCommandMockResponse = {
  name: "appsync-api-name",
  apiId: "api-id",
  authenticationType: "OPENID_CONNECT",
  apiType: "GRAPHQL",
  arn: "arn:aws:appsync:eu-central-1:account-id:apis/api-id",
  uris: {
    GRAPHQL: "https://api-id.appsync-api.eu-central-1.amazonaws.com/graphql",
  },
};

describe("appsync resource", () => {
  beforeEach(() => {
    sendMock.mockClear();
    sendMock.mockResolvedValue({
      graphqlApi: GetGraphqlApiCommandMockResponse,
    });
  });

  describe("getData", () => {
    it("returns data about the given appsync api (arn)", async () => {
      const result = await getData(GetGraphqlApiCommandMockResponse.arn);
      expect(result).toEqual({
        AWS: {
          Arn: "arn:aws:appsync:eu-central-1:account-id:apis/api-id",
          Name: "appsync-api-name",
          ApiId: "api-id",
          AuthenticationType: "OPENID_CONNECT",
          ApiType: "GRAPHQL",
          Endpoint:
            "https://api-id.appsync-api.eu-central-1.amazonaws.com/graphql",
          Account: "account-id",
          Service: "appsync",
        },
        description: "AWS AppSync API",
        name: "appsync-api-name",
      });
    });
  });

  describe("getMarkdown", () => {
    it("returns default markdown content for new resources", async () => {
      const data = await getData(GetGraphqlApiCommandMockResponse.arn);
      const result = await getMarkdown(data);

      // @ts-ignore
      expect(result)
        .toMatchMarkdown(`### Describe an AppSync API using the AWS-CLI

      <CLICommand>aws appsync get-graphql --api-id /ApiId/ </CLICommand>
      
      ### Overview
      
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ligula et orci pellentesque volutpat. In imperdiet augue sit amet imperdiet ultricies. Etiam eget dui elementum, tempor ligula quis, consectetur eros. Suspendisse sodales mattis ex, nec tempor lorem. Maecenas eget risus suscipit, gravida lectus eu, dictum sapien. Nunc efficitur sem eget dui tempus aliquam. `);
    });
  });

  describe("getFileName", () => {
    it("returns the appsync api name as the file name", async () => {
      const data = await getData(GetGraphqlApiCommandMockResponse.arn);
      const result = await getFileName(data);
      expect(result).toEqual("appsync-api-name");
    });
  });
});
