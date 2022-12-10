#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const logPathsPath = path.join(__dirname, 'logPaths.json');

console.log(__dirname);

if(fs.existsSync(logPathsPath)) {
  const logPaths = fs.readFileSync(logPathsPath, 'utf-8');
  console.log(logPaths);
}