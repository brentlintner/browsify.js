var workflow = require('jWorkflow'),
    path = require('path'),
    fs = require('fs'),
    requirejs = path.join(__dirname, "../deps/browser-require/require.js");

module.exports = {
    compile: function (files, opts, done) {
        opts = opts || {};

        var order = workflow.order(function (code, baton) {
            baton.take();
            return fs.readFile(requirejs, "utf-8", function (err, data) {
                baton.pass(data);
            });
        });

        files.forEach(function (file) {
            order.andThen(function (code, baton) {
                baton.take();
                fs.readFile(path.join(process.cwd(), file), "utf-8", function (err, data) {
                    if (err) throw err;

                    var path = file.replace(/\.js$/, '');

                    if (opts.truncatePrefix) {
                        path = path.replace(new RegExp("^" + opts.truncatePrefix), '');
                    }

                    baton.pass(code + "require.define('" + path +
                           "', function (require, module, exports) {\n" + data + "});\n");
                });
            });
        });

        if (opts.namespace) {
            order.andThen(function (code, baton) {
                return "var " + opts.namespace + " = (function () {" +
                    code +
                    "return {require: require};" +
                "}());";
            });
        }

        order.andThen(done).start();
    }
};
