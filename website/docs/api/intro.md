---
sidebar_position: 1
---

# CLI

CloudCatalog provides a set of scripts to help you generate, serve, and deploy your website.

Once your catalog is bootstrapped, the source will contain the CloudCatalog scripts that you can invoke with your package manager:

```json title="package.json"
{
  // ...
  "scripts": {
    "dev": "cloudcatalog dev",
    "start": "cloudcatalog start",
    "build": "cloudcatalog build"
  }
}
```

## CloudCatalog CLI commands {#cloudcatalog-cli-commands}

Below is a list of CloudCatalog CLI commands and their usages:

### `cloudcatalog start` {#cloudcatalog-start-sitedir}

Starts the built CloudCatalog (post-build phase)

### `cloudcatalog build` {#cloudcatalog-build-sitedir}

Compiles your site for production.

Starts the built CloudCatalog (post-build phase)

### `cloudcatalog dev` {#cloudcatalog-dev-sitedir}

Runs your catalog in dev mode
