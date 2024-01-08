---
sidebar_position: 2
---

# Importing

Using the `@catalogcloud/cli` you can import a SQS queue directly into your catalog. You will need the `ARN` of the SQS queue to import.

:::tip
Run the CloudCatalog CLI within your catalog directory.
:::

### Required permissions

To import a SQS queue into the Catalog your AWS credentials will need the following permissions:

- `sqs:GetQueueUrl` - [Documentation website](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_GetQueueUrl.html)
- `sqs:GetQueueAttributes` - [Documentation website](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_GetQueueAttributes.html)

### Steps to import

1. Navigate to your CloudCatalog in your terminal
2. Import the SQS resource into your catalog by running the following command:

```sh
npx @cloudcatalog/cli@latest import-resource {arn}
```

3. Start your CloudCatalog

```sh
npm run dev
```

4. Navigate to the [resources](https://localhost:3000/resources) or [overview](https://localhost:3000/overview) page to see your state machine.

### Example resource page

Here is an example of what an imported SQS queue would look like.

![SQS Example](./img/example.png)
