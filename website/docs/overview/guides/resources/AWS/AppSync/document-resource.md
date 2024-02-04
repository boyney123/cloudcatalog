---
sidebar_position: 2
---

# Documenting

After you [import your AppSync API](/docs/overview/guides/resources/AWS/AppSync/adding-resource) you can start to add documentation to the resource.

The generated markdown file is split into two main parts:

- frontmatter
  - Stores information about the AppSync API.
- markdown 
  - Stores documentation about your AppSync API.

Here is an example of a state machine resource markdown file.

```mdx
---
name: PaymentProcessingAPI
description: AWS AppSync API
service: payment-service
AWS:
  Arn: arn:aws:appsync:eu-central-1:123456789123:apis/payment-processing-id
  Name: payment-processing-id
  ApiId: "api-id",
  AuthenticationType: "OPENID_CONNECT",
  ApiType: "GRAPHQL",
  Endpoint: "https://api-id.appsync-api.eu-central-1.amazonaws.com/graphql",
  Account: "123456789123",
  Service: "appsync"
catalog:
  updatedAt: '2024-01-07T16:40:30.270Z'
  parent: appsync
  path: PaymentProcessingAPI
owners:
  - payment-team
  - dboyne
---


## About this AppSync API

The PaymentProcessingAPI exposes a GraphQL api that is used by the Payment application.

```

### Example resource page

Example of what the above resource would render.

![AppSync API Example](./img/example.png)