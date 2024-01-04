/** @type {import('next').NextConfig} */
const config = require("./cloudcatalog.config");
const nextConfig = {
  basePath: config.basePath,
  trailingSlash: config.trailingSlash,
  publicRuntimeConfig: {
    basePath: config.basePath,
  },
  reactStrictMode: true,
  output: "export",
};

module.exports = nextConfig;
