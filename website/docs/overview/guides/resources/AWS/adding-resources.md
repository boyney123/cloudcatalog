---
sidebar_position: 1
---

# Overview

CloudCatalog is designed with the developer experience in mind.

You should be able to add Resources to your catalog within a few steps.

:::info[CloudCatalog is still in development]
CloudCatalog is still new. Only [AWS Lambda](https://aws.amazon.com/lambda/) resources are currently supported.

**More resource imports will be added into the project.**

If you want to help please feel free to get in contact to start help contribute to the project.
:::

## Adding Resources to your CloudCatalog

You will find all resources within the `/data/resources` directory.

The easiest way to add a resource to your project is to use the `@cloudcatalog/cli`.

To import a resource into your project run the following command:

```bash
npx @cloudcatalog/cli import-resource {arn}
```

```sh title="Example: Import a Lambda ARN"
npx @cloudcatalog/cli import-resource arn:aws:lambda:us-west-2:1234567891234:function:my-awesome-function
```

This command will make a request to get the information required for the given resource and then will document your resource.
The imported resource will go to `/data/resouces/{service}/{name}.mdx`.

:::tip
To use the CLI you will need permissions to get the resource. Each resource has various permissions required. You can review them in the source code if you need too.
:::

## Example of adding an Resource {#example}

Let's import a Lambda function into our CloudCatalog.

_Make sure you are in the current directory of your catalog_.

Find the ARN of your Lambda Function you want to import then run the following command:

```bash
npx @cloudcatalog/cli import-resource {arn}
```

For this example let's say the function name was `my-first-function`, once you import the resource the markdown file will be generated.

```mdx title="Example: /data/resources/lambda/my-first-function.mdx"
---
AWS:
  Arn: >-
    arn:aws:lambda:us-west-2:1234567891234:function:my-first-function
  FunctionName: my-first-function
  MemorySize: 1024
  Runtime: nodejs16.x
  Handler: index.handler
  CodeSize: 692
  Description: ""
  LastModified: 2022-11-22T10:55:10.000+0000
  Account: "670852811695"
  Service: lambda
catalog:
  updatedAt: "2024-01-02T20:41:55.360Z"
  parent: lambda
  path: my-first-function
---

### Trigger this lambda function using the AWS-CLI

<CLICommand>aws lambda invoke --function-name /FunctionName/ </CLICommand>

### Overview

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ligula et orci pellentesque volutpat. In imperdiet augue sit amet imperdiet ultricies. Etiam eget dui elementum, tempor ligula quis, consectetur eros. Suspendisse sodales mattis ex, nec tempor lorem. Maecenas eget risus suscipit, gravida lectus eu, dictum sapien. Nunc efficitur sem eget dui tempus aliquam. Aenean ultricies porta velit. Quisque tempus in nisl nec pulvina
```

Once done, run the CloudCatalog and navigate to your new resource [localhost:3000/overview](http://localhost:3000/overview)

You should now see your new resource!

<!-- ![UserSignedUp Example](/img/guides/events/UserSignedUpExample.png) -->

**Well done. You created your first resource** 🎉.

Let's go through this markdown file in more detail to understand what is happening.

---

## Understanding the resource file

Each resource markdown page is split into two main parts:

- **Frontmatter**: Metadata for the resource
- **Content**: The documentation for your resource (with supported custom components)

### Frontmatter

Each resource has **frontmatter** inside of it. CloudCatalog will use this metadata to render out features in the catalog.

:::info
The **AWS** and **catalog** properties in the frontmatter are owned by CloudCatalog. These are generated using the `@cloudcatalog/cli` tools. It's recommeneded not to edit these fields.
:::

```mdx title="/data/resources/lambda/my-first-function.md"
---
name: My Lambda Function
description: This is my first lambda function documented.
AWS:
  Arn: >-
    arn:aws:lambda:us-west-2:1234567891234:function:my-first-function
  FunctionName: my-first-function
  MemorySize: 1024
  Runtime: nodejs16.x
  Handler: index.handler
  CodeSize: 692
  Description: ""
  LastModified: 2022-11-22T10:55:10.000+0000
  Account: "670852811695"
  Service: lambda
catalog:
  updatedAt: "2024-01-02T20:41:55.360Z"
  parent: lambda
  path: my-first-function
---
```

Each resource has its own properies that are set for you and also properties you can edit. To understand more you can read the [api docs](/docs/api/resource-front-matter).
