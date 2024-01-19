---
sidebar_position: 3
---

# Contributing

CloudCatalog resources are either [enriched or not-enriched with information from AWS](/docs/overview/guides/resources/AWS/All%20other%20resources/intro).

If you would like to add enrichment to your resource and contribute to CloudCatalog here is a guide on how to get started.

### Resources

The `@cloudcatalog/cli import-resource` command supports many resources, to enrich a resource you will need too:


1. Add a new file to the resources directory [/packages/cloudcatalog-cli/src/resources](https://github.com/boyney123/cloudcatalog/tree/main/packages/cloudcatalog-cli/src/resources)
1. Export functions `getData`, `getMarkdown` and `getFileName`. [Look at Lambda for an example](https://github.com/boyney123/cloudcatalog/blob/main/packages/cloudcatalog-cli/src/resources/dynamodb.ts)
    1. `getData` - Returns the frontmatter for the resource type
    1. `getMarkdown` - Returns default markdown for this resource.
    1. `getFileName` - Returns the name of the file that will get written to cloudcatalog.

1.  Use the AWS SDK to enrich a resource and return this information in the `getData` function.
1. Write tests for your new resource you can [find examples here](https://github.com/boyney123/cloudcatalog/tree/main/packages/cloudcatalog-cli/tests/resources)

### Updating documentation

Once you are happy with your new resource, and have written tests. Raise a pull request and we can support writing documentation for your new resource.

### Contributions can help

CloudCatalog foundations have been built, if you find this project useful and want to help, we need resources building built out. If you have any questions feel free to reach out on [Discord](https://discord.gg/d8Apdbhrkg).