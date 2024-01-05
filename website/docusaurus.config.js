// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "CloudCatalog",
  tagline:
    "CloudCatalog | Discover, Explore and Document your AWS Architecture",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://cloudcatalog.dev",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "cloudcatalog", // Usually your GitHub org/user name.
  projectName: "cloudcatalog", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        gtag: {
          trackingID: "G-S4LD2PRGR4",
          anonymizeIP: true,
        },
        docs: {
          sidebarPath: "./sidebars.js",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/boyney123/cloudcatalog/website",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/boyney123/cloudcatalog/website",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/opengraph.png",
      colorMode: {
        defaultMode: "light",
      },
      announcementBar: {
        content:
          '⭐️⭐️ If you like CloudCatalog, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/boyney123/cloudcatalog">GitHub</a>! ⭐️⭐️',
      },
      docs: {
        sidebar: {
          autoCollapseCategories: false,
        },
      },
      navbar: {
        title: "CloudCatalog",
        logo: {
          alt: "My Site Logo",
          src: "https://www.eventcatalog.dev/img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Docs",
          },
          {
            type: "docSidebar",
            sidebarId: "api",
            position: "left",
            label: "API",
          },
          {
            type: "docSidebar",
            sidebarId: "community",
            position: "left",
            label: "Community",
          },
          {
            href: "https://serverlessland.com",
            label: "Learn Serverless",
            position: "left",
          },
          {
            href: "https://discord.gg/d8Apdbhrkg",
            label: "Discord",
            position: "left",
          },
          // {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: "https://app.cloudcatalog.dev/",
            label: "Demo",
            position: "right",
          },
          {
            href: "https://github.com/boyney123/cloudcatalog",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Introduction",
                to: "/docs/overview/intro",
              },
              {
                label: "Install",
                to: "/docs/overview/getting-started/installation",
              },
              {
                label: "Guides",
                to: "/docs/category/guides",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discord.com/invite/d8Apdbhrkg",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/boyney123",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/boyney123/cloudcatalog",
              },
            ],
          },
        ],
        copyright: `Open Source project built by David Boyne. Built for the community.`,
      },
      prism: {
        theme: prismThemes.nightOwl,
        darkTheme: prismThemes.dracula,
      },
    }),
  plugins: [
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],
};

export default config;
