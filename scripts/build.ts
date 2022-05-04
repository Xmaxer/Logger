import { exec as originalExec } from 'child_process';
import * as fs from 'fs';
import * as util from 'util';

const WINDOWS_BASH_PATH = 'C:\\Program Files\\Git\\bin\\bash.exe';

let settings = {};

if (process.platform === 'win32') {
  settings = {
    shell: WINDOWS_BASH_PATH,
  };
}

const exec = util.promisify(originalExec);

async function build() {
  await exec(
    'rm -rf dist && tsc --noEmit false && tscpaths -p tsconfig.json -s . -o ./dist && cp README.md ./dist/',
    settings,
  );

  const jsonFile = JSON.parse(fs.readFileSync('./package.json').toString());

  const version = jsonFile.version;
  const author = jsonFile.author;
  const license = jsonFile.license;
  const name = jsonFile.name;
  const dependencies = jsonFile.dependencies;
  const exports = jsonFile.exports;
  const main = jsonFile.main;
  const type = jsonFile.type;
  const publishConfig = jsonFile.publishConfig;
  const homepage = jsonFile.homepage;
  const repository = jsonFile.repository;

  fs.writeFileSync(
    './dist/package.json',
    JSON.stringify(
      {
        name,
        version,
        author,
        license,
        dependencies,
        exports,
        main,
        type,
        publishConfig,
        homepage,
        repository,
      },
      null,
      2,
    ),
  );
}

build();
