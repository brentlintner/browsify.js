# Browsify

Batch convert CommonJS modules into a browser compatible package.

## Installation

    npm install -g browsify

## CLI Examples

    browsify path/file.js >> modules.js
    browsify path/to/files/ >> modules.js
    browsify ../../relative/path/lib --truncate-prefix ../../relative/path/ >> modules.js

For more options.

    browsify -h

## Using In Code

    npm install browsify
    
then require the processor module..

```javascript
var processor = require('browsify').processor;
processor.compile(["file.js". "file2.js"], {},  function (str) {
    process.stdout.write(str);
});
```

## Before Running Locally

    ./configure
