#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const logPathsPath = path.join(__dirname, 'logPaths.json');

console.log(__dirname);

if(fs.existsSync(logPathsPath)) {
  const logPaths = JSON.parse(fs.readFileSync(logPathsPath, 'utf-8'));
  
  for(const key in logPaths) {
    const value = logPaths[key];

    if(fs.existsSync(value)) {
      console.log(fs.readFileSync(value));
    }

    console.log(value);
  }

}