---
sidebar_position: 2
---

# Frontmatter fields

Each resource in CloudCatalog will contain **frontmatter** this data is used by CloudCatalog to render your resource correctly.

Some of these fields are editable, and some are read-only.

:::warning[Fields owned by CloudCatalog]
In the frontmatter the fields `AWS` and `catalog` are fields owned by CloudCatalog, change at your own risk. 

Reimporting resources into CloudCatalog will override these values.

:::

## Optional fields {#optional-fields}

### `name` {#name}

Friendly name for your resource.

```mdx title="Example"
---
name: MyAwesomeResource
---
```

### `description` {#description}

Short summary of your resource.

```mdx title="Example"
---
description: My awesome new resource
---
```

### `owners` {#owners}

An array of users or teams ids that own the resource.

```mdx title="Example"
---
owners:
  - dboyne
  - mSmith
  - my-awesome-team
---
```

### `service` {#service}

The service id of the service that the resource belongs too.

:::info[Services]
Every resource can belong to a service. You will need to [create a service](/docs/overview/guides/services/adding-services) before you can add the resource to the service.
:::

```mdx title="Example"
---
service: payment-service
---
```
