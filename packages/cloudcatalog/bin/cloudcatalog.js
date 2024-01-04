#!/usr/bin/env node

const cli = require('commander');
const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs-extra');

// this is the directory the users project is in
const projectDIR = process.cwd();
const coreDirectory = path.join(__dirname, '../');

// this is the directory where the eventcatalog core code is
const catalogLibDir = path.join(projectDIR, '.cloudcatalog-core');

const copyCoreApplicationCodeIntoUsersProjectDir = () => {
  const excludeFilesForCopy = ['.next', 'cloudcatalog.config.js', 'bin', 'README.md'];
  const exclusions = excludeFilesForCopy.map((file) => path.join(catalogLibDir, file));

  fs.ensureDirSync(catalogLibDir);
  fs.copySync(coreDirectory, catalogLibDir);

  // remove any files we don't care about
  exclusions.map((path) => {
    try {
      fs.lstatSync(path).isDirectory() ? fs.rmdirSync(path, { recursive: true, force: true }) : fs.unlinkSync(path);
    } catch (error) {}
  });

  fs.copyFileSync(path.join(projectDIR, 'cloudcatalog.config.js'), path.join(catalogLibDir, 'cloudcatalog.config.js'));
};

cli
  .command('start [siteDir]')
  .description('Start the development server.')
  .action(() => {
    execSync(`ls`, {
      cwd: catalogLibDir,
      stdio: 'inherit',
    });
    // execSync(`cross-env PROJECT_DIR=${projectDIR} npm run start`, {
    //   cwd: catalogLibDir,
    //   stdio: 'inherit',
    // });
  });

cli
  .command('build [siteDir]')
  .description('Build cloudcatalog project.')
  .action(() => {
    if (!fs.existsSync(catalogLibDir)) {
      copyCoreApplicationCodeIntoUsersProjectDir();
    }

    // copy any public assets over (from users to the lib itself)
    fs.copySync(path.join(projectDIR, 'public'), path.join(catalogLibDir, 'public'));

    // build using nextjs
    execSync(`cross-env PROJECT_DIR=${projectDIR} npm run build`, {
      cwd: catalogLibDir,
      stdio: 'inherit',
    });

    // everything is built make sure its back in the users project directory
    fs.copySync(path.join(catalogLibDir, '.next'), path.join(projectDIR, '.next'));
    fs.copySync(path.join(catalogLibDir, 'out'), path.join(projectDIR, 'out'));
  });

cli
  .command('dev [siteDir]')
  .description('Start the development server.')
  .action(() => {
    // Fix for https://github.com/boyney123/eventcatalog/issues/41, not the best but will do for now
    fs.rmSync(catalogLibDir, { recursive: true, force: true });

    copyCoreApplicationCodeIntoUsersProjectDir();

    // copy any public assets over (from users to the lib itself)
    fs.copySync(path.join(projectDIR, 'public'), path.join(catalogLibDir, 'public'));

    fs.copyFileSync(path.join(projectDIR, 'cloudcatalog.config.js'), path.join(catalogLibDir, 'cloudcatalog.config.js'));

    execSync(`cross-env PROJECT_DIR=${projectDIR} npm run dev`, {
      cwd: catalogLibDir,
      stdio: 'inherit',
    });
  });

// cli

//   .command('generate [siteDir]')
//   .description('Start the generator scripts.')
//   .action(() => {
//     if (!fs.existsSync(catalogLibDir)) {
//       // get the application ready
//       copyCoreApplicationCodeIntoUsersProjectDir();
//     }

//     fs.copyFileSync(path.join(projectDIR, 'cloudcatalog.config.js'), path.join(catalogLibDir, 'cloudcatalog.config.js'));

//     execSync(`cross-env PROJECT_DIR=${projectDIR} npm run generate`, {
//       cwd: catalogLibDir,
//       stdio: 'inherit',
//     });
//   });

async function run() {
  cli.parse(process.argv);

  if (!process.argv.slice(2).length) {
    cli.outputHelp();
  }
}

run();

// process.on('unhandledRejection', (err) => {
//   console.error(err);
//   // console.error(chalk.red(err.stack));
//   process.exit(1);
// });
