---
sidebar_position: 2
---

# Adding services

You should be able to add Services to your catalog within a few steps.

### Adding Services to your CloudCatalog

You will find all services within the `/data/services` directory.

To add a new service you will need to create a new service file

- `/data/services/{service-name}/index.md`
  - (example `/data/services/My Awesome Service/index.md`)

Once you create your new file you will need to fill it with the service front-matter data and markdown content.

**There are two parts to the service data**

1. [service configuration (frontmatter)](/docs/api/service-front-matter)
2. [content (markdown)](#example)

Fill in the details of your service and run the Catalog.

## Example of adding a Service {#example}

Let's add a new service called **Awesome Service**.

Create a new folder in the `/data/services/` called `Awesome Service` and then add an `index.md` file to it.
For example: `/data/services/Awesome Sevice/index.md`

Copy the contents below into your new file.

```mdx title="/data/services/Awesome Service/index.md"
---
id: awesome-service
description: This is my new awesome service
name: Awesome Service
---

### What is this service?

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ligula et orci pellentesque volutpat. In imperdiet augue sit amet imperdiet ultricies. Etiam eget dui elementum, tempor ligula quis, consectetur eros. Suspendisse sodales mattis ex, nec tempor lorem. Maecenas eget risus suscipit, gravida lectus eu, dictum sapien. Nunc efficitur sem eget dui tempus aliquam. Aenean ultricies porta velit. Quisque tempus in nisl nec pulvina
```

Once done, run the CloudCatalog and navigate to your new event [localhost:3000/services/awesome-service](http://localhost:3000/service/awesome-service)

You should now see your new service!

<!-- ![UserSignedUp Example](/img/guides/events/UserSignedUpExample.png) -->

**Well done. You created your first service** 🎉.
