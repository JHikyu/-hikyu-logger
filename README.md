To install @hikyu/log, run the following command:
```bash
npm install @hikyu/log
```

To use the package, require it in your project like so:
```js
const { log, typeLog, useFile } = require('@jhikyu/log');
```

# Usage

## useFile
The useFile function allows you to log messages to a file instead of the console. It takes a file path as its first argument and an options object as its second argument. The options object can contain the following properties:

- lines: a maximum number of lines for the log file. If this number is exceeded, the file will be truncated.
- daily: a boolean value indicating whether a new log file should be created every day.
- hourly: a boolean value indicating whether a new log file should be created every hour.

The useFile function should be called at the start of your program to ensure that all subsequent log messages are saved to the specified file.

```js
useFile('my-log-file', { lines: 1000, daily: true, hourly: false });
```

This will log messages to the file my-log-file and create a new file every day, with a maximum of 1000 lines per file.

## log
The log function logs a message to the console. It takes any number of arguments and logs them in the following format:
```
[<timestamp>] [<arg1>, <arg2>, ...]
```

For example:
```js
log('hello', 'world');

// Output: [<timestamp>] [hello, world]
```

## typeLog
The typeLog function is similar to the log function, but it allows you to specify a type for the log message. It takes a type string as its first argument and any number of additional arguments to be logged. The log message will be in the following format:
```
[<timestamp>] [<type>] [<arg1>, <arg2>, ...]
```

For example:
```js
typeLog('error', 'Something went wrong');

// Output: [<timestamp>] [error] [Something went wrong]
```

# License
This package is licensed under the MIT License.