const replace = require('replace-in-file');
const configLocal = require('../../src/config/config.local.json');
const configDev = require('../../src/config/config.dev.json');
const configSbx = require('../../src/config/config.sbx.json');
const configProd = require('../../src/config/config.prod.json');

let config;
switch (process.env.CONFIG_ENV) {
  case 'sbx':
    config = configSbx;
    break;
  case 'dev':
    config = configDev;
    break;
  case 'prod':
    config = configProd;
    break;
  default:
    config = configLocal;
}

const removeFiles = new RegExp(/<!--devOnlyStart-->[\s\S]*<!--devOnlyEnd-->/gi);

const targetedFiles = ['build/index.html'];
const oldItems = ['http://localhost:9000'];
const newItem = [config.iframeUrl];
console.log('CONFIG_ENV:', process.env.CONFIG_ENV);

if (process.env.CONFIG_ENV !== 'dev') {
  console.log('Removing devOnly HTML');
  targetedFiles.push('build/index.html');
  oldItems.push(removeFiles);
  newItem.push('');
}

const options = {
  files: targetedFiles,
  from: oldItems,
  to: newItem,
};

replace(options)
  .then((results) => {
    console.log('Replacement results:', results);
  })
  .catch((error) => {
    console.error('Error occurred:', error);
  });
