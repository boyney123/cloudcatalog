const sendMock = jest.fn(() => {});
import { LambdaClient, GetFunctionCommand } from "@aws-sdk/client-lambda";
import { LambdaResource } from "../../src/resource-factories/lambda";

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

describe("Lambda resource", () => {
  let lambdaResource: LambdaResource;
  const mockArn = "arn:aws:lambda:region:account-id:function:function-name";

  beforeEach(() => {
    lambdaResource = new LambdaResource(mockArn);
    sendMock.mockClear();
  });

  it("calling fetchData returns expected frontmatter data for the resource", async () => {
    sendMock.mockImplementationOnce(() => ({
      Configuration: {
        FunctionArn: "arn:aws:lambda:region:account-id:function:function-name",
        FunctionName: "function-name",
        MemorySize: 1024,
        Runtime: "nodejs16.x",
        Handler: "index.handler",
        LastModified: "2020-01-01:00:00:00",
        Description: "My Awesome Function",
        CodeSize: 210432,
      },
    }));

    await lambdaResource.fetchData();

    expect(LambdaClient).toHaveBeenCalled();
    expect(GetFunctionCommand).toHaveBeenCalledWith({
      FunctionName: "function-name",
    });
    expect(lambdaResource.data).toEqual({
      AWS: {
        Arn: "arn:aws:lambda:region:account-id:function:function-name",
        FunctionName: "function-name",
        MemorySize: 1024,
        Runtime: "nodejs16.x",
        Handler: "index.handler",
        LastModified: "2020-01-01:00:00:00",
        CodeSize: 210432,
        Description: "My Awesome Function",
        Account: "account-id",
        Service: "lambda",
      },
    });
  });
});
