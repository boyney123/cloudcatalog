---
sidebar_position: 3
---

# Adding users to teams

Once you have [added some teams to your Catalog](/docs/overview/guides/teams/adding-teams) and also [added some users](/docs/overview/guides/users/adding-users) to your Catalog you can now add users to teams.

To do this you will need to edit the `cloudcatalog.config.js` file in your catalog.

### Example

Let's say we have a new team called `Epic Team` (which [you can create here](/docs/overview/guides/teams/adding-teams)). We can assign users to this epic team.
Let's make changes to the `cloudcatalog.config.js` file.

```js title="cloudcatalog.config.js"
module.exports = {
  title: "CloudCatalog",
  tagline: "Discover, Explore and Document your AWS Architectures",
  organizationName: "Your Company",
  editUrl: "https://github.com/boyney123/cloudcatalog-demo/edit/master",
  trailingSlash: true,
  logo: {
    alt: "EventCatalog Logo",
    src: "logo.svg",
  },
  users: [
    {
      id: "dboyne",
      name: "David Boyne",
      avatarUrl:
        "https://pbs.twimg.com/profile_images/1262283153563140096/DYRDqKg6_400x400.png",
      role: "Developer",
      summary: "Currently building tools for Event Architectures.",
      teams: ["epic-team"],
    },
    {
      id: "mSmith",
      name: "Matthew Smith",
      avatarUrl: "https://randomuser.me/api/portraits/lego/3.jpg",
      role: "Developer",
      summary:
        "About Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat.",
      teams: ["epic-team"],
    },
  ],
};
```

That's it. We have added both users `dboyne` and `mSmith` to the team `Epic Team`.

:::info
When you create a team you will give it an `id` field. This `id` value is what you use when mapping users to teams.
:::

To learn more about the `cloudcatlog.config.js` you can read the [api docs](/docs/api/cloudcatalog.config.js)
