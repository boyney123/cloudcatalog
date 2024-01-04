---
sidebar_position: 5
---

# Team frontmatter config

## Overview {#overview}

Teams are just markdown files, with this comes the use of Content, MDX components and also [front-matter](https://jekyllrb.com/docs/front-matter/).

Teams are optional and a great way to organise users and resources.

You can learn more about [teams in the guide](/docs/overview/guides/teams/introduction).

Here is an example of a team.

```mdx"
---
id: user-team
summary: The Payment Service, leveraging AWS Lambda functions, provides a scalable and efficient solution for end-to-end payment processing and notifications.
name: User Team
---

### Empowering Transactions with Cutting-Edge Technology

At the heart of our digital marketplace, the Serverless Payment Team is dedicated to revolutionizing the way payments are processed in the online world. Leveraging the agility and efficiency of serverless architectures, our team is at the forefront of facilitating seamless, secure, and rapid financial transactions for our users.

### Our Mission

To provide an unparalleled payment experience that combines speed, security, and simplicity, harnessing the power of serverless technology to cater to the dynamic needs of businesses and consumers alike.

```

## Required fields {#required-fields}

### `id` {#id}

A unique id of your team. 

:::info

You will use this id in your owners fields for [resources](/docs/api/resource-front-matter#owners) or [services](/docs/api/service-front-matter#owners). You will also use this `id` to [assign users to teams](/docs/overview/guides/teams/adding-users-to-teams).

:::

```mdx title="Example"
---
  id: user-team
---
```

### `name` {#name}

A name for your team. This name will be rendered in the UI.

```mdx title="Example"
---
  name: User Team
---
```

## Optional fields {#optional-fields}

### `summary` {#summary}

Short summary of your team.

:::tip
Keep it short, remember you can add as much detail as you want in the markdown section of your team! Add images, videos anything. It's just markdown.
:::

```mdx title="Example"
---
  summary: The Payment Service, leveraging AWS Lambda functions
---
```