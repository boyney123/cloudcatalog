---
name: users
description: Table for storing user information
service: user-service
owners:
  - dboyne
  - user-team
AWS:
  Arn: arn:aws:dynamodb:us-west-2:123456789123:table/user-payments
  TableName: user-payments
  CreationDateTime: '2022-09-15T09:56:47.097Z'
  DeletionProtectionEnabled: false
  TableStatus: ACTIVE
  TableSizeBytes: 762
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
  path: users
---

## About this table

The users table is an integral part of our infrastructure, serving as the backbone for managing user data. This table is tailored to support various user-related functionalities across our applications, including authentication, profile management, and user activity tracking. It is optimized for high performance and scalability to handle our growing user base.

## Access patterns

### User Authentication:
- Primary access pattern involves querying by `userID` or `email` to retrieve credentials and perform authentication checks.
- Example Query: Retrieve user details by `email` for login purposes.

### Profile Information Retrieval:

- Frequently accessed for displaying user profile information.
- Example Query: Fetch complete user details by `userID` for profile viewing or editing.
