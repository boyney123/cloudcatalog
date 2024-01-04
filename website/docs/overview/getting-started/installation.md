---
sidebar_position: 1
---

# Installation

Getting up and running with EventCatalog should take a few minutes (hopefully!).

## Requirements {#requirements}

- [Node.js](https://nodejs.org/en/download/) version >= 20.5.1 or above (which can be checked by running `node -v`). You can use [nvm](https://github.com/nvm-sh/nvm) for managing multiple Node versions on a single machine installed
- [Yarn](https://yarnpkg.com/en/) version >= 1.5 (which can be checked by running `yarn --version`). Yarn is a performant package manager for JavaScript and replaces the `npm` client. It is not strictly necessary but highly encouraged.

## Scaffold project website {#scaffold-project-website}

The easiest way to install CloudCatalog is to use the command line tool that helps you scaffold a skeleton CloudCatalog website. You can run this command anywhere in a new empty repository or within an existing repository, it will create a new directory containing the scaffolded files.

```bash
npx @cloudcatalog/create-catalog@latest [name]
```

Example:

```bash
npx @cloudcatalog/create-catalog@latest my-cloudcatalog
```

## Project structure {#project-structure}

Assuming you named your site `my-cloudcatalog`, you will see the following files generated under a new directory `my-cloudcatalog/`:

```bash
my-cloudcatalog
├── data
│   ├── resources
│   │    └──lambda
│   │       └──payment-emails.md
│   │       └──process-payments.md
│   │       └──process-signups.md
│   │    └──services
│   │       └──Payment Service
│   │       │   └──index.md
│   │       └──User Service
│   │           └──index.md
│   │    └──teams
│   │       └──Payment Team
│   │       │   └──index.md
│   │       └──User Team
│   │           └──index.md
├── public
├── cloudcatalog.config.js
├── package.json
├── README.md
└── yarn.lock
```

### Project structure rundown {#project-structure-rundown}

- `/data/resources` 
    - Contains the resource Markdown files within your Architecture. 
    - More details can be found in the [resources guide](/docs/overview/guides/resources/introduction)
- `/data/services/` 
    - Contains services. Each resource can be tagged with a service.
    - More details can be found in the [services guide](/docs/overview/guides/services/introduction)
- `/data/teams/` 
    - Contains teams. These are teams within your organisation.
    - Teams can be assigned to resources or services.
    - Users are assigned to teams.
    - More details can be found in the [teams guide](/docs/overview/guides/teams/introduction)
- `/public/` 
    - Static directory. Any contents inside here will be copied into the root of the final `build` directory. 
    - You can add your own logo here and favicon. 
    - More details can be found in the [customise guide](/docs/overview/guides/customize)
- `/cloudcatalog.config.js` 
    - A config file containing the site configuration.
    - Read the [API docs](/docs/api/cloudcatalog.config.js)
- `/package.json` 
    - File required for your application to work.

## Running the development server {#running-the-development-server}

To preview your changes as you edit the files, you can run a local development server that will serve your website and reflect the latest changes.

```bash
cd my-cloudcatalog
npm run dev
```

By default, a browser window will open at http://localhost:3000.

Congratulations! You have just created your first CloudCatalog site!

## Build {#build}

CloudCatalog uses NextJS under the hood. To build the website run the following command:

```bash
npm run build
```

This will output your catalog to the `out` directory.
