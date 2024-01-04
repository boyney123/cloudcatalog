#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

const awsCatalogDir = path.join(__dirname, "../packages/cloudcatalog");
const projectDIR = path.join(__dirname, "../examples/default");

fs.copyFileSync(
  path.join(projectDIR, "cloudcatalog.config.js"),
  path.join(awsCatalogDir, "cloudcatalog.config.js"),
);

console.log(projectDIR);

execSync(`PROJECT_DIR=${projectDIR} npm run dev`, {
  cwd: awsCatalogDir,
  stdio: "inherit",
});
