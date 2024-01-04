---
sidebar_position: 7
---

# Upgrade Catalog

To upgrade your CloudCatalog you can find the package `@cloudcatalog/core` to upgrade in your `package.json` file.

```json
{
  "name": "my-catalog",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    ...
  },
  "dependencies": {
    "@eventcatalog/core": "0.6.8"
  }
}
```

Once you upgrade the version number, run `npm install` or `yarn` to install the latest updates.

:::tip
If you don't see the changes you expect, try removing the `.cloudcatalog-core` folder, `node_modules` folder and install fresh again.
:::
