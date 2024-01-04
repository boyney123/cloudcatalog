---
sidebar_position: 3
---

# Adding resources to services

Once you have [defined some services](/docs/overview/guides/services/adding-services) you can now add resources to your services.

To do this you will need to change the frontmatter properties in your resource file, and add the `service` property to it.

### Example

Let's say we have a Lambda resource:

```mdx title="Example: without service"
---
AWS:
  Arn: >-
    arn:aws:lambda:us-west-2:1234567891234:function:my-first-function
  FunctionName: my-first-function
  MemorySize: 1024
  Runtime: nodejs16.x
  Handler: index.handler
  CodeSize: 692
  Description: ""
  LastModified: 2022-11-22T10:55:10.000+0000
  Account: "670852811695"
  Service: lambda
catalog:
  updatedAt: "2024-01-02T20:41:55.360Z"
  parent: lambda
  path: my-first-function
---
```

Now let's add the service to the resource, to do this we add the `service` onto the resource.

```mdx title="Example: without service"
---
service: payment-service
AWS:
  Arn: >-
    arn:aws:lambda:us-west-2:1234567891234:function:my-first-function
  FunctionName: my-first-function
  MemorySize: 1024
  Runtime: nodejs16.x
  Handler: index.handler
  CodeSize: 692
  Description: ""
  LastModified: 2022-11-22T10:55:10.000+0000
  Account: "670852811695"
  Service: lambda
catalog:
  updatedAt: "2024-01-02T20:41:55.360Z"
  parent: lambda
  path: my-first-function
---
```

As you can see we added the `service: payment-service` onto the frontmatter. This will connect a `payment-service` to this resource.

When you create a service, you specify it's **id** property. Use this **id** field to map to a service from a resource.

:::tip
Many more resources will come to CloudCatalog. 

Services give you the ability to group resources into services to help you document them in groups for your teams. Each service has its own markdown file and each resource can be documented. 
:::

To learn more about the Service API you can read the [api docs](/docs/api/service-front-matter)