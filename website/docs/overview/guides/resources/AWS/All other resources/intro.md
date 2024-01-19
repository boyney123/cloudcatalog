---
sidebar_position: 1
---

# Introduction

CloudCatalog allows you to import any AWS resource into your catalog.

When importing resources into your catalog one of two things will happen:

- Resource is enriched
- Resource is generic (not-enriched)

### Enriched resource

An enriched resource means the AWS SDK has been used to fetch additional informtion for your resource. 

This requires addtional code in CloudCatalog, and more enriched resources will be supported as time goes on.

#### Enriched resources supported (so far)

- [Lambda](/docs/overview/guides/resources/AWS/Lambda/adding-lambda-resource)
- [Step Functions](/docs/overview/guides/resources/AWS/Step%20Functions/adding-stepfunction-resource)
- [SQS](/docs/overview/guides/resources/AWS/SQS/adding-resource)
- [DynamoDB](/docs/overview/guides/resources/AWS/DynamoDB/adding-resource)

:::tip Adding enriched resources

AWS supports 100s of services, this means 100s of different types of resources.

If you want to enrich your resource, we would love your help!

To add a new resource to CloudCatalog please read the guide.

:::

#### Generic resources (not-enriched)

Any resource that is not enriched is marked as *generic*. 

This means the AWS SDK was not used to enrich your resource, but you can still add users, owners, services and markdown to your resources.

:::tip Future support

In the future these resources may be enriched, no  breaking changes will occur, the **AWS** and **catalog** fields will be used to enrich your resource. Anything outside these fields (your frontmatter or markdown) will be unchanged.

:::