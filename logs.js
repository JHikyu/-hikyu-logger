#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { log, error } = require('./index.js');
const logPathsPath = path.join(__dirname, 'logPaths.json');


if(fs.existsSync(logPathsPath)) {
  const logPaths = JSON.parse(fs.readFileSync(logPathsPath, 'utf8'));
  
  for(const key in logPaths) {
    const value = logPaths[key];

    error(key);

    // console.log(key, logPaths);

    if(fs.existsSync(value)) {
      
      const readStream = fs.createReadStream(value, { encoding: 'utf8' });
      const lines = [];
      
      readStream.on('data', chunk => {
        // Split the chunk into lines and add them to the array
        lines.push(...chunk.split('\n'));
      });
      
      readStream.on('end', () => {
        // Log the last 10 lines of the file
        for (let i = Math.max(lines.length - 10, 0); i < lines.length; i++) {
          console.log(`${lines[i]}`);
        }
      });

    }
  }

}
else {
  log('No log files found :(')
  log('Try installing @hikyu/log in a project and use the useFile() function')
  log('Run that project and then try logs again!')
}