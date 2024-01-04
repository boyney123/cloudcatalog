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

### Trigger this function with test data

<CLICommand>aws lambda invoke --function-name /FunctionName/ </CLICommand>

Example payload for the function.

```json
{
  "emailDetails": {
    "recipientEmailAddress": "customer@example.com",
    "recipientName": "John Doe",
    "subject": "Payment Notification",
    "templateId": "payment_template_001"
  },
  "paymentData": {
    "transactionId": "TXN123456789",
    "paymentAmount": 150.0,
    "currency": "USD",
    "paymentDueDate": "2024-01-15",
    "paymentMethod": "Credit Card",
    "invoiceId": "INV-900123456"
  },
  "senderDetails": {
    "senderName": "ABC Company",
    "senderEmailAddress": "payments@abccompany.com",
    "companyAddress": "1234 Business Rd, Business City, BC 12345",
    "companyPhone": "+1 234-567-8900"
  },
  "additionalInfo": {
    "customerAccountNumber": "1234567890",
    "latePaymentFees": 10.0,
    "paymentPortalUrl": "https://payments.abccompany.com"
  }
}
```

### Maintenance

This function is owned by the payment team. Contact them if you have any questions.
