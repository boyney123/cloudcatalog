---
name: user-payments
description: Table storing user payments information
service: payment-service
owners:
  - dboyne
  - payment-team
AWS:
  Arn: arn:aws:dynamodb:us-west-2:123456789123:table/user-payments
  TableName: user-payments
  CreationDateTime: '2022-09-15T09:56:47.097Z'
  DeletionProtectionEnabled: false
  TableStatus: ACTIVE
  TableSizeBytes: 76
  StreamSpecification:
    StreamEnabled: true
    StreamViewType: NEW_AND_OLD_IMAGES
  ProvisionedThroughput:
    ReadCapacityUnits: 1
    WriteCapacityUnits: 1
  AttributeDefinitions:
    - AttributeName: id
      AttributeType: S
  Service: dynamodb
  AccountId: 123456789123
catalog:
  updatedAt: '2024-01-10T07:48:19.106Z'
  parent: dynamodb
  path: user-payments
---

## About this table

The user-payments table is an integral component of our payment service, designed to efficiently manage and store transactional data related to user payments. This table serves as a central repository for payment records, ensuring secure and rapid access to transaction details.

## Access patterns

### Retrieve User Transaction History
- **Use Case**: Fetch all transactions made by a specific user.
- **Query Pattern**: Query the table using the userId as the partition key. This returns all items with the matching userId, sorted by transactionId.

### Lookup Specific Transaction

- **Use Case**: Retrieve details of a specific transaction for a user.
- **Query Pattern**: Use both userId (partition key) and transactionId (sort key) to get the specific transaction record.

### Query Transactions Based on Status

- **Use Case**: Identify transactions that are pending, successful, or failed.
- **Implementation**: This may require the use of a Global Secondary Index (GSI) with status as the key if frequent queries are made based on the transaction status.
