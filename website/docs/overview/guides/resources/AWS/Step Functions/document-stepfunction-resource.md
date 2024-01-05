---
sidebar_position: 2
---

# Documenting

After you [import your Step Function state machine](/docs/overview/guides/resources/AWS/Step%20Functions/adding-stepfunction-resource) you can start to add documentation to the resource.

The generated markdown file is split into two main parts:

- frontmatter
  - Stores information about the Lambda function.
- markdown 
  - Stores documentation about your Lambda function.

Here is an example of a state machine resource markdown file.

```mdx
---
name: Payment processing with Stripe
description: AWS Step Function
AWS:
  Arn: arn:aws:states:us-west-2:123456789123:stateMachine:MyStateMachine-h9czfryzj
  Name: MyStateMachine-h9czfryzj
  Status: ACTIVE
  Type: STANDARD
  CreationDate: '2023-11-15T17:27:18.287Z'
  LoggingConfiguration: 'OFF'
  Account: '123456789123'
  Service: step-function
catalog:
  updatedAt: '2024-01-05T15:43:19.462Z'
  parent: step-function
  path: payment-processing
owners:
  - dboyne
  - payment-team  
---


## How the state machine works

Some cool summary here.

```

### Example resource page

Example of what the above resource would render.

![Step Function Example](./img/stepfunctions-example.png)