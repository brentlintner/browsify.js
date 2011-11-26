var fs = require('fs'),
    _path = require('path');

module.exports = {
    collect: function (path) {
        var files = [];

        (function collect(p) {
            if (fs.statSync(p).isDirectory()) {
                fs.readdirSync(p).forEach(function (item) {
                    collect(_path.join(p, item));
                });
            } else if (p.match(/\.js$/)) {
                files.push(p);
            }
        }(path));

        return files;
    }
};
