---
sidebar_position: 2
---

# Configuration

The `cloudcatalog.config.js` file is the heart of your application. It allows you to define overrides for CloudCatalog.

Using the configuration you will be able to setup user pages, custom themes and much more.

## What goes into a `cloudcatalog.config.js`? {#what-goes-into-a-cloudcatalogconfigjs}

Using the CLI tool when creating your CloudCatalog you will get a default `cloudcatalog.config.js` out the box.

However, it can be helpful if you have a high-level understanding of how the configuration file works.

The high-level overview of CloudCatalog configuration can be categorized into:

- [Site metadata](/docs/api/cloudcatalog.config.js)
- [Users](/docs/api/cloudcatalog.config.js#users)

For exact reference to each of the configurable fields, you may refer to [**`cloudcatalog.config.js` API reference**](api/cloudcatalog.config.js.md).

### Site metadata {#site-metadata}

Site metadata contains the essential global metadata such as `title`, `url`, `tagling` and `organizationName`.

They are used in a number of places such as your site's title and headings, browser tab icon, and landing page.

### Users {#users}

You can store user information inside your `cloudcatalog.config.js` file.

This is a perfect way to help teams identify who owns which resource or service service.

You can setup your users and reference them inside your event or service markdown files.

```js title="eventcatalog.config.js (adding users)"
module.exports = {
  // ...
  users: [
    {
      id: "dboyne",
      name: "David Boyne",
      avatarUrl:
        "https://pbs.twimg.com/profile_images/1262283153563140096/DYRDqKg6_400x400.png",
      role: "Developer",
      summary: "Currently building tools for Event Architectures.",
    },
  ],
};
```

:::tip Referencing Users inside your Event/Service markdown file

To add an owner to your resource or service you can just reference the `id` of the user.

```js title="data/services/User Service.md (Adding 2 owners to service)"
---
id: user-service
name: User Service
owners:
    - dboyne
    - mSmith
---
```

In this example you will see dboyne and mSmith as the owners of the service `User Service`.

:::
