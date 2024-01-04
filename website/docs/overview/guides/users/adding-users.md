---
sidebar_position: 2
---

# Adding users

You can add users to your Catalog by adding them to your `cloudcatalog.config.js` file.

Each user needs a unique id.

#### Example of users in a catalog

```js
module.exports = {
  title: 'CloudCatalog',
  tagline: 'Discover, Explore and Document your AWS Architectures',
  organizationName: 'Your Company',
  editUrl: 'https://github.com/boyney123/cloudcatalog-demo/edit/master',
  trailingSlash: true,
  logo: {
    alt: 'EventCatalog Logo',
    src: 'logo.svg'
  },
  users: [
    {
      id: 'dboyne',
      name: 'David Boyne',
      avatarUrl: 'https://pbs.twimg.com/profile_images/1262283153563140096/DYRDqKg6_400x400.png',
      role: 'Developer',
      summary: 'Currently building tools for Event Architectures.',
      teams: ['payment-team']
    },
    {
      id: 'mSmith',
      name: 'Matthew Smith',
      avatarUrl: 'https://randomuser.me/api/portraits/lego/3.jpg',
      role: 'Developer',
      summary: 'About Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat.',
      teams: ['user-team']
    },
  ]
}

```

In this example we have two users:

- David Boyne (dboyne)
- Matthew Smith (mSmith)

To add users to your project, you can edit the `users` array in the `cloudcatalog.config.js` file.


