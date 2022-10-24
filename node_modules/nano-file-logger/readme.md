# nano-file-logger

An easy approach to file logging!

## Design

I designed this library with ease of use in mind.

## Installation

Run the command:
`npm install nano-file-logger`

## Usage

The time logged is automatically written to a file.

```

// Import the library
const FileLogger = require('file-logger');

// Init the logger
const log = new FileLogger('log.txt');

// Simply use the logger
log.add('Hello world!');

// Retreive the log
log.retrieve(); // This function will return an array with all the logs in a file

```

```

## Output Format

Timestamp - Message
```
