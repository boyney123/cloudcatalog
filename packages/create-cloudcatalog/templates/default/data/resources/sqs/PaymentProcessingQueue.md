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

#### Load Management

During peak times, like sales or holiday seasons, the queue efficiently manages the increased load by holding payment requests. This prevents the payment processing service from being overwhelmed, ensuring consistent processing times and system stability.

### Error Handling and Retry Mechanism

In case of failures in the payment processing system, PaymentProcessingQueue can be configured to retry the payment processing after a certain interval or move the failed payment requests to a dead-letter queue for further investigation, thereby reducing the risk of lost transactions.

### Send a message to the SQS queue

<CLICommand>aws sqs send-message --queue-url /QueueUrl/ --message-body "Hello, this is a test message"</CLICommand>  
    