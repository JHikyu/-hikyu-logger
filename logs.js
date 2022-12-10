#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

console.log(__dirname);

fs.readdir(__dirname, (err, files) => {
  if(err) return;

  console.log(files.join('\n'));
})