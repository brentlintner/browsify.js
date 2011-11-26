var workflow = require('jWorkflow'),
    path = require('path'),
    fs = require('fs'),
    requirejs = path.join(__dirname, "../deps/browser-require/require.js");

module.exports = {
    compile: function (files, opts, done) {
        opts = opts || {};

        var order = workflow.order(function (prev, baton) {
            baton.take();
            return fs.readFile(requirejs, "utf-8", function (err, data) {
                baton.pass(data);
            });
        });

        files.forEach(function (file) {
            order.andThen(function (prev, baton) {
                baton.take();
                fs.readFile(path.join(process.cwd(), file), "utf-8", function (err, data) {
                    if (done) throw err;

                    var path = file.replace(/\.js$/, '');

                    if (opts.truncatePrefix) {
                        path = path.replace(new RegExp("^" + opts.truncatePrefix), '');
                    }

                    baton.pass(prev + "require.define('" + path +
                           "', function (require, module, exports) {\n" + data + "});\n");
                });
            });
        });

        order.andThen(done).start();
    }
};
