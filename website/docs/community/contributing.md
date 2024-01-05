---
sidebar_position: 2
---

# Contributing

There are many things we can do with CloudCatalog, so your feedback is welcome and any contributions you have.

### Contributing resources

CloudCatalog has a [CLI tool](https://github.com/boyney123/cloudcatalog/tree/main/packages/cloudcatalog-cli) that allows users to import resources.

If you want to contribute and add a new resource you will need to add a new file in the [resources directory of the CLI](https://github.com/boyney123/cloudcatalog/tree/main/packages/cloudcatalog-cli/src/resources).

Each resource file needs to export:

- getData (function)
- getMarkdown (function)
- getFileName (function)

You can see the [Lambda example for reference](https://github.com/boyney123/cloudcatalog/blob/main/packages/cloudcatalog-cli/src/resources/lambda.ts).

When the `import-resource` command runs it will check the given arn, and get the service from it. CloudCatalog will then process the correct resource code to import that into your project.

If you have any questions [please join the discord server](https://discord.com/invite/d8Apdbhrkg).



