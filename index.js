const fs = require('fs');
const path = require('path');

const c = require('cli-color');
const cType = c.blue.bold;
const cError = c.red.bold;
const cDate = c.blackBright.bold;


var useFile = {
  active: false,
  path: null,
  lines: 10000,
  daily: false,
  hourly: false,
  errors: true,
}
module.exports.useFile = (filePath, { lines, daily, hourly, errors } = {}) => {
  useFile.active = true;
  useFile.path = path.resolve(filePath);
  // if path does not exist, create it
  if(!fs.existsSync(useFile.path) && !daily && !hourly) {
    fs.writeFileSync(useFile.path, '');
  }
  if(lines) useFile.lines = lines;
  if(daily) useFile.daily = daily;
  if(hourly) useFile.hourly = hourly;
  if(errors === false) useFile.errors = errors;

  globalLogs();
}

process.on('uncaughtException', err => {
  console.log(cDate(`${new Date().toLocaleTimeString()}`), cError(err.name), err.message, '\n', err.stack);

  if(useFile.active && useFile.errors) {
    append(`${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}\t|\t${err.name}\t|\t${err.message}\n${err.stack}`);
  }
})

module.exports.log = (...args) => {
  console.log(cDate(`${new Date().toLocaleTimeString()}`), ...args);
  if(useFile.active) append(`${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}\t|\t${args.join(', ')}`);
}

module.exports.error = (...args) => {
  console.log(cError(`${new Date().toLocaleTimeString()}`), ...args);
  if(useFile.active) append(`${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}\t|\t${args.join(', ')}`);
}

module.exports.typeLog = (type, ...args) => {
  console.log(cDate(`${new Date().toLocaleTimeString()}`), cType(type), ...args);
  if(useFile.active) append(`${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}\t|\t${type}\t|\t${args.join(', ')}`);
}

function append(text) {
  let filePath = useFile.path;

  if(useFile.daily) {
    let date = new Date();
    filePath = `${filePath}.${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    if(!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '');
    }
  }
  if(useFile.hourly) {
    let date = new Date();
    filePath = `${filePath}.${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}`;
    if(!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '');
    }
  }

  // if useFile.lines is not set, append to file
  if(!useFile.lines) {
    fs.appendFileSync(filePath, text);
    return;
  }
  
  let file = fs.readFileSync(filePath, 'utf8');
  let lines = file.split('\n');
  lines.push(text);
  while(lines.length > useFile.lines) {
    lines.shift();
  }
  fs.writeFileSync(filePath, lines.join('\n'));

}

async function globalLogs() {
  const globalPath = `${process.env.NVM_DIR}/versions/node/${process.version}/lib/node_modules/@hikyu/log`;
  const logPathsPath = globalPath + '/logPaths.json';

  const projectName = process.mainModule.path.split('/').pop();

  //! Global logs
  fs.stat(`${process.env.NVM_DIR}/versions/node/${process.version}/lib/node_modules/@hikyu/log`, (err, stats) => {
    if(err || !stats.isDirectory()) return;

    let logPaths = {};

    if(!fs.existsSync(logPathsPath)) {
      fs.writeFileSync(logPathsPath, JSON.stringify(logPaths));
    }
  
    logPaths = JSON.parse(fs.readFileSync(logPathsPath, 'utf-8'));

    logPaths[projectName] = useFile.path;

    fs.writeFileSync(logPathsPath, JSON.stringify(logPaths));
  })
}