---
sidebar_position: 4
---

# Service frontmatter config

## Overview {#overview}

Services are just markdown files, with this comes the use of Content, MDX components and also [front-matter](https://jekyllrb.com/docs/front-matter/).

Services group resources together, and teams and owners can be assigned services.

You can learn more about [services in the guide](/docs/overview/guides/services/introduction).

Here is an example of a service.

```mdx"
---
id: payment-service
description: The Payment Service, leveraging AWS Lambda functions.
name: Payment Service
owners:
  - dboyne
  - paymentTeam
---

### What is this service?

The Payment Service is a sophisticated cloud-based architecture, primarily composed of a suite of AWS Lambda functions, each expertly designed to handle specific aspects of the payment processing lifecycle. 

This modular approach ensures high scalability, reliability, and efficiency, making it ideal for businesses seeking to streamline their payment operations. The service covers a broad range of functionalities, from initiating and processing transactions to handling confirmations and sending payment-related notifications.

```

## Required fields {#required-fields}

### `id` {#id}

A unique id of your service. 

:::info

You will use this id in your resources when you link resources to services. [Read the guide](/docs/overview/guides/services/adding-resources-to-services).

:::

```mdx title="Example"
---
  id: payment-service
---
```

### `name` {#name}

A name for your service. This name will be rendered in the UI.

```mdx title="Example"
---
  name: Payment Service
---
```

## Optional fields {#optional-fields}

### `description` {#description}

Short summary of your service.

:::tip
Keep it short, remember you can add as much detail as you want in the markdown section of your service! Add images, videos anything. It's just markdown.
:::

```mdx title="Example"
---
  description: The Payment Service, leveraging AWS Lambda functions
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
