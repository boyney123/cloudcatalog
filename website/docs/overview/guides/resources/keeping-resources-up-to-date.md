---
sidebar_position: 4
---

# Updating resources

Resources in your AWS account change all the time depending on what is being deployed and when.

CloudCatalog is a static website, so once built and deployed the documentation may be out of date over time.

To keep your resources up to date you have a few options:

- Reimport the ARN into your project
- Run the `npm run reimport` command (coming soon!)

## Reimport the ARN into your project

Using the `@cloudcatalog/cli` you can import resources. Every time you import a resource into your project CloudCatalog will check to see if the resource is already defined.

If the resource is already defined, it will update the `AWS` and `catalog` properties in your frontmatter. This means all your changes will be persisted and CloudCatalog will just update the required fields.

Rerunning import commands can keep your resources up to date.

## Run the `npm run reimport` command

:::info
This feature is still in development (coming soon)
:::

Before you build your CloudCatalog and host your documentation, you can run the `npm run reimport` command. This command will reimport all resources into your project updating on the `AWS` property of each resource.

This command will allow you to update all resources every time you deploy.

:::tip[Want to keep your resouces up to date?]

CloudCatalog is just a static website, so you decide how often you want to keep your resources up to date.

Why not rebuild and deploy your Catalog on a schedule every night? This allows you to keep your resources up to date every 24 hours.

:::
