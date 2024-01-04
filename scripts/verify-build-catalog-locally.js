#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

const catalogDir = path.join(__dirname, "../packages/cloudcatalog");
const projectDIR = path.join(__dirname, "../examples/default");

fs.copyFileSync(
  path.join(projectDIR, "cloudcatalog.config.js"),
  path.join(catalogDir, "cloudcatalog.config.js"),
);

execSync(`PROJECT_DIR=${projectDIR} npm run build`, {
  cwd: catalogDir,
  stdio: "inherit",
});
