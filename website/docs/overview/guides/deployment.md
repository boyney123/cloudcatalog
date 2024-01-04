---
sidebar_position: 6
---

# Deployment

CloudCatalog exports your catalog to static HTML which means **you can deploy your application anywhere you want!**

To build your Catalog you will need to run:

```bash
npm run build
```

This will output two directories

- `out` - Your EventCatalog as Static HTML (recommended to use)
- `.next` - If you wish to deploy to NextJS (NextJS outputs this by default, recommended to use the `out` directory)

Using these directories you should be able to host the Catalog on any platform you want.
