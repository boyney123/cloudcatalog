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
service: payment-service
---


## How the state machine works

#### 1. Initiation and Payment Request

The process starts when your system needs to handle a payment, possibly initiated by a customer's purchase. The step function sends a payment request to Stripe, including necessary details like amount, currency, and customer information.

#### 2. Validation and Stripe Interaction

The function then interacts with Stripe's API to initiate the payment process. This might involve creating a payment intent or a charge object in Stripe's system, depending on your specific integration.

#### 3. Waiting for Payment Confirmation (Task Token)

After initiating the payment with Stripe, the step function issues a task token and enters a waiting state. This state is maintained until Stripe processes the payment and sends a confirmation. This could be immediate or take some time, especially in cases of delayed payment methods like bank transfers.

#### 4. Webhook for Stripe Callback
Stripe will typically send payment confirmations or updates via webhooks. You'd have a webhook endpoint set up to receive these notifications from Stripe. Once Stripe confirms the payment (successful, failed, or otherwise), it hits this endpoint.

#### Processing Webhook and Resuming Step Function
When your webhook endpoint receives a notification from Stripe, it uses the task token to resume the step function. This webhook handler essentially acts as a bridge between Stripe and your AWS Step Functions.

#### Post-Payment Processing: 
After the step function resumes, it processes the outcome of the payment. This could involve updating database records, sending a receipt to the customer, adjusting inventory, and other related tasks.

#### Completion: 
Finally, the step function concludes its operation. If the payment was successful, it might end with a state that confirms the completion of the transaction. If the payment failed, it might trigger a different set of actions like notifying the customer or retrying the payment.

### Start execution command

<CLICommand>aws stepfunctions start-execution --state-machine-arn /Arn/ --input "\{\\"key\\":\\"value\\"\}"</CLICommand>

    