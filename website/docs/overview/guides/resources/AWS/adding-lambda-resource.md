---
sidebar_position: 2
---

# Lambda Resources

CloudCatalog CLI allows you to import Lambda resources directly into your Catalog using the ARN of the Lambda function.

## Import Lambda resource into Catalog

Using the `@catalogcloud/cli` you can import resources directly into your catalog. You will need the `ARN` of the Lambda function to import.

:::tip
Run the CloudCatalog CLI within your catalog directory.
:::

1. Navigate to your Catalog in your terminal
2. Import the lambda resource into your catalog by running the following command:

```sh
npx @cloudcatalog/cli import-resource {arn}
```

3. Start your CloudCatalog

```sh
npm run dev
```

4. Navigate to the resources (/resources) or overview page to see your Lambda Function.

## Adding custom markdown to your Lambda resource

Running the `import-resource` command, will generate a `.md` file. This file will contain [frontmatter](/docs/api/resource-front-matter) and markdown foe you.

```mdx[Example]
---
AWS:
  Arn: >-
    arn:aws:lambda:us-west-2:1234567891234:function:payment-emails
  FunctionName: payment-emails
  MemorySize: 1024
  Runtime: nodejs16.x
  Handler: index.handler
  LastModified: 2022-11-22T10:55:10.000+0000
  CodeSize: 210432
  Service: lambda
  Account: 123245789
catalog:
  updatedAt: "2024-01-02T20:41:55.360Z"
  parent: lambda
  path: payment-emails
---

### What does this function do?

Something cool.

```

The fields `AWS` and `catalog` are populated by CloudCatalog. You can specify custom fields in your resource.
To learn more look read the [frontmatter documentation for resources](/docs/api/resource-front-matter).

## Updating Lambda Resources

Overtime you will want to update the information pulled from AWS in your Catalog.

You can do this by rerunning `import-resource` command. This will keep your markdown properties and override the CloudCatalog owned properties.

:::info
A new feature is being built that will allow you to pull latest resources on build, meaning you don't have to do this manual feature.
:::
