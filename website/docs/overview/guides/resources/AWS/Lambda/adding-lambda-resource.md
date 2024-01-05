---
sidebar_position: 2
---

# Importing

Using the `@catalogcloud/cli` you can import lambda resources directly into your catalog. You will need the `ARN` of the Lambda function to import.

:::tip
Run the CloudCatalog CLI within your catalog directory.
:::

### Required permissions

To import a Lambda function into the Catalog your AWS credentials will need the following permissions:

- `lambda:GetFunction` - [Documentation website](https://docs.aws.amazon.com/lambda/latest/dg/API_GetFunction.html)

### Steps to import

1. Navigate to your CloudCatalog in your terminal
2. Import the Lambda resource into your catalog by running the following command:

```sh
npx @cloudcatalog/cli@latest import-resource {arn}
```

3. Start your CloudCatalog

```sh
npm run dev
```

4. Navigate to the [resources](https://localhost:3000/resources) or [overview](https://localhost:3000/overview) page to see your Lambda Function.

### Example resource page

Here is an example of what an imported Lambda function would look like.

![Lambda Example](./img/lambda-example.png)
