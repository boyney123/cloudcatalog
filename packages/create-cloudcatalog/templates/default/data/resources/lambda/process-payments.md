---
service: payment-service
description: Lambda function to process payments
name: Payment Processor
AWS:
  Arn: >-
    arn:aws:lambda:us-west-2:1234567891234:function:PaymentProcessor
  FunctionName: PaymentProcessor
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
  path: process-payments
owners:
  - dboyne
  - payment-team
---

### What does this function do?

This Lambda function automates the processing of online payment transactions. On triggering, it validates transaction details, such as customer payment information and fund availability, and then securely communicates with external payment gateways to process the transactions. Upon receiving the gateway's response, the function updates the database with transaction statuses, handles error logging, and sends necessary notifications to customers and internal teams. It ensures efficiency, compliance with financial regulations, and robust error handling, making the payment process streamlined and secure for both the business and its customers.

<CLICommand>aws lambda invoke --function-name /FunctionName/ </CLICommand>

Example payload

```json
{
  "transactionId": "12345ABC",
  "customerId": "Cust78910",
  "amount": 100.0,
  "currency": "USD",
  "paymentMethod": {
    "type": "credit_card",
    "details": {
      "cardNumber": "1234-5678-9012-3456",
      "expiryDate": "12/24",
      "cvv": "123"
    }
  },
  "billingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "street": "123 Main St",
    "city": "Anytown",
    "state": "Anystate",
    "zipCode": "12345",
    "country": "USA"
  },
  "orderDetails": {
    "orderId": "Order123456",
    "items": [
      {
        "itemId": "98765",
        "description": "Widget A",
        "quantity": 2,
        "unitPrice": 25.0
      },
      {
        "itemId": "54321",
        "description": "Widget B",
        "quantity": 1,
        "unitPrice": 50.0
      }
    ]
  },
  "callbackUrl": "https://example.com/payment-status"
}
```

### Maintenance

This function is owned by the payment team. Contact them if you have any questions.
