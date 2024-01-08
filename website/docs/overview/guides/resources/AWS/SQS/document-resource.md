---
sidebar_position: 2
---

# Documenting

After you [import your SQS queue](/docs/overview/guides/resources/AWS/SQS/adding-resource) you can start to add documentation to the resource.

The generated markdown file is split into two main parts:

- frontmatter
  - Stores information about the Lambda function.
- markdown 
  - Stores documentation about your Lambda function.

Here is an example of a state machine resource markdown file.

```mdx
---
name: PaymentProcessingQueue
description: SQS Queue
service: payment-service
AWS:
  Arn: arn:aws:sqs:us-west-2:123456789123:PaymentProcessingQueue
  Name: PaymentProcessingQueue
  CreatedTimestamp: '2022-09-21T12:02:51.000Z'
  VisibilityTimeout: 960
  MaximumMessageSize: 262144
  MessageRetentionPeriod: 345600
  DelaySeconds: '0'
  ReceiveMessageWaitTimeSeconds: '0'
  SqsManagedSseEnabled: 'false'
  QueueUrl: https://sqs.us-west-2.amazonaws.com/123456789123/PaymentProcessingQueue
  Account: '123456789123'
  Service: sqs
catalog:
  updatedAt: '2024-01-07T16:40:30.270Z'
  parent: sqs
  path: PaymentProcessingQueue
owners:
  - payment-team
  - dboyne
---


## About this SQS queue

The PaymentProcessingQueue acts as a mediator between the payment service and the payment processing system. When a customer initiates a payment, the details are sent to this queue, allowing for asynchronous processing. This means the payment can be processed independently of the customer's session, enhancing system resilience and user experience.

```

### Example resource page

Example of what the above resource would render.

![SQS Example](./img/example.png)