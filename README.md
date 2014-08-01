# Browsify

[![NPM version](https://badge.fury.io/js/browsify.svg)](http://badge.fury.io/js/browsify)

[![Dependency Status](https://david-dm.org/brentlintner/browsify.js.svg)](https://david-dm.org/brentlintner/browsify.js)

Batch convert CommonJS modules into a browser compatible package.

## Installation

    npm install -g browsify

## CLI Examples

    browsify path/file.js >> modules.js
    browsify path/to/files/ >> modules.js
    browsify ../../relative/path/lib --truncate-prefix ../../relative/path/ >> modules.js
    browsify path/to/files/ --namespace objname >> modules.js

For more options.

    browsify -h

## Using In Code

    npm install browsify

then require the processor module..

```javascript
var processor = require('browsify').processor,
    opts = {}; // ex: {namespae: "foo"}

processor.compile(["file.js", "file2.js"], opts,  function (str) {
    process.stdout.write(str);
});
```

## Before Running Locally

    ./configure

## Use Case Example

    browsify lib/foo.js >> modules.js

modules.js looks like:

```javascript
// browser-require

// for each module
require.define('lib/foo', function (require, module, exports) {
   // actual code defined in lib/foo.js
   module.exports = {
       bar: function () {}
   };
});
```

..and in the browser you would require the module as expected.

```javascript
var foo = require('lib/foo');
```
..or if there was a `--namespace ns` specified, you would require it as so.

```javascript
var foo = ns.require('lib/foo');
```

## Versioning

This project ascribes to [semantic versioning](http://semver.org).
