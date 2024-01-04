---
sidebar_position: 3
---

# Resource frontmatter config

## Overview {#overview}

Resources are just markdown files, with this comes the use of Content, MDX components and also [front-matter](https://jekyllrb.com/docs/front-matter/).

Here is an example of an imported resource in CloudCatalog

```mdx"
---
service: payment-service
description: Automates the sending of payment emails
name: Payment emails
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
owners:
  - dboyne
  - mSmith
  - payment-team
---

### What does this function do?

The Lambda function is designed to streamline the process of sending payment emails in a highly efficient and automated manner. Once triggered, it meticulously gathers necessary payment details and recipient information from a designated data source. Utilizing this information, the function then dynamically generates personalized payment emails, ensuring that each message includes all relevant details such as payment amount, transaction ID, and due date. The emails are formatted for clarity and professionalism, adhering to predefined templates that maintain brand consistency. Upon successful generation, the Lambda function dispatches these emails to the respective recipients, providing them with timely and accurate payment notifications. This process not only enhances the speed and reliability of payment communications but also significantly reduces the manual effort required, thereby optimizing operational efficiency.
```

:::warning[AWS and catalog fields are owned by CloudCatalog]
The fields `AWS` and `catalog` are fields owned by CloudCatalog.

When you import or reimport resources into your Catalog, the platform will update these fields. It's highly recommended to leave the fields as they are.
:::

## Optional fields {#optional-fields}

### `name` {#name}

Friendly name for your resource. If no name is provided CloudCatalog will render a name for your resource. (Example, the Lambda Function will be used for a Lambda resource).

```mdx title="Example"
---
name: Payment Function
---
```

### `description` {#description}

Short summary of your resource.

```mdx title="Example"
---
description: Function that handles payments.
---
```

### `owners` {#owners}

An array of users or teams ids that own the resource.

```mdx title="Example"
---
owners:
  - dboyne
  - mSmith
  - my-awesome-team
---
```

### `service` {#service}

The service id of the service that the resource belongs too.

:::info[Services]
Every resource can belong to a service. You will need to [create a service](/docs/overview/guides/services/adding-services) before you can add the resource to the service.
:::

```mdx title="Example"
---
service: payment-service
---
```
