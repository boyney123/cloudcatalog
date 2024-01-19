---
sidebar_position: 2
---

# Importing any resource

Using the `@catalogcloud/cli` you can import a any resource directly into your catalog. You will need the `ARN` of the resource to import.

:::tip
Run the CloudCatalog CLI within your catalog directory.
:::

### Steps to import

1. Navigate to your CloudCatalog in your terminal
2. Import the resource into your catalog by running the following command:

```sh
npx @cloudcatalog/cli@latest import-resource {arn}
```

3. Start your CloudCatalog

```sh
npm run dev
```

4. Navigate to the [resources](https://localhost:3000/resources) or [overview](https://localhost:3000/overview) page to see your resources.

:::tip Adding owners/users/services

Remember you can add users, owners or services to your resources and document them with markdown!

When you import a resource it will have a default template you can change.

:::

