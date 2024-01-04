---
sidebar_position: 2
---

# cloudcatalog.config.js

## Overview {#overview}

`cloudcatalog.config.js` contains configurations for your site and is placed in the root directory of your site.

## Required fields {#required-fields}

### `title` {#title}

- Type: `string`

Title for your website.

```js title="cloudcatalog.config.js"
module.exports = {
  title: 'CloudCatalog',
};
```

### `organizationName` {#organizationName}

- Type: `string`

Your organization name.

```js title="cloudcatalog.config.js"
module.exports = {
  organizationName: 'Your Company',
};
```

## Optional fields {#optional-fields}

### `editUrl` {#editUrl}

- Type: `string`

URL used when people want to edit the documentation. For example your GitHub repo and branch.

```js title="cloudcatalog.config.js"
module.exports = {
  editUrl: 'https://github.com/boyney123/cloudcatalog-demo/edit/master',
};
```

### `tagline` {#tagline}

Tagline that is shown on your homepage.

```js title="cloudcatalog.config.js"
module.exports = {
  tagline: 'Discover, Explore and Document your AWS Architecture',
};
```

### `logo` {#logo}

Alt and path to your company logo.

Example, if your logo is in `public/logo.png`:

_EventCatalog will look inside the public directory, no need to put this into your string value_

```js title="cloudcatalog.config.js"
module.exports = {
  logo: {
    src: '/logo.png',
    alt: 'My Company Logo',
  },
};
```

### `users` {#users}

Add user information here. You can reference these inside your services, resources and teams.

```js title="cloudcatalog.config.js"
module.exports = {
  users: [
    {
      id: 'dboyne',
      name: 'David Boyne',
      avatarUrl: 'https://pbs.twimg.com/profile_images/1262283153563140096/DYRDqKg6_400x400.png',
      role: 'Developer',
      summary: 'Currently building tools for Event Architectures.',
    },
  ],
};
```


### `basePath` {#basepath}

Set the `basePath` in order to be able to deploy the eventcatalog under a sub-path of the domain.

```js title="cloudcatalog.config.js"
module.exports = {
  basePath: '/my-catalog',
};
```

### `trailingSlash` {#trailingslash}

Changes the [trailing slash](https://nextjs.org/docs/api-reference/next.config.js/trailing-slash) behaviour of next.js.

```js title="cloudcatalog.config.js"
module.exports = {
  trailingSlash: true,
};
```

### `openGraph` {#opengraph}

Manage the Open Graph tags that are used for social media sharing.

- Type: `openGraphConfig`
  - `ogTitle`: Open Graph title, this is the title that is shown in previews on Facebook & Slack. Defaults to `title` as set in the config.
  - `ogDescription`: Open Graph description, this is used for the description meta tag. Defaults to `tagline` as set in the config.
  - `ogUrl`: Open Graph URL, the homepage of your website. Defaults to `homepageLink` as set in the config.
  - `ogImage`: Open Graph image location (can be relative or absolute)

```js title="cloudcatalog.config.js"
module.exports = {
  openGraph: {
    ogTitle: 'EventCatalog | Discover, Explore and Document your Event Driven Architectures.',
    ogDescription: 'An open source tool powered by markdown to document your Event Driven Architecture.',
    ogUrl: 'https://eventcatalog.dev/',
    ogImage: 'https://eventcatalog.dev/img/opengraph.png',
  },
};
```
