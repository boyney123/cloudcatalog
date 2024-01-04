---
sidebar_position: 2
---

# Adding teams

You should be able to add Teams to your catalog within a few steps.

### Adding Teams to your CloudCatalog

You will find all teams within the `/data/teams` directory.

To add a new team you will need to create a new team file

- `/data/teams/{team-name}/index.md`
  - (example `/data/services/Epic Team/index.md`)

Once you create your new file you will need to fill it with the service front-matter data and markdown content.

**There are two parts to the team data**

1. [service configuration (frontmatter)](/docs/api/service-front-matter)
2. [content (markdown)](#example)

Fill in the details of your team and run the Catalog.

## Example of adding a Team {#example}

Let's add a new service called **Epic Team**.

Create a new folder in the `/data/teams/` called `Epic Team` and then add an `index.md` file to it.
For example: `/data/teams/Epic Team/index.md`

Copy the contents below into your new file.

```mdx title="/data/teams/Epic Team/index.md"
---
id: epic-team
summary: The Payment Service, leveraging AWS Lambda functions, provides a scalable and efficient solution for end-to-end payment processing and notifications.
name: Epic Team
---

### Empowering Transactions with Cutting-Edge Technology

This is an epic team, we can add any markdown here we want!

```

Once done, run the CloudCatalog and navigate to your new event [localhost:3000/teams/epic-team](http://localhost:3000/teams/epic-team)

You should now see your new team!

**Well done. You created your first team** 🎉.

