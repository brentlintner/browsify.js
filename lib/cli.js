var argsparser = require('argsparser'),
    fs = require('fs'),
    path = require('path'),
    utils = require('./utils'),
    processor = require('./processor');

function _help() {
    process.stdout.write(fs.readFileSync(__dirname + "/../HELP", "utf-8"));
}

function _version() {
    process.stdout.write(JSON.parse(fs.readFileSync(__dirname + "/../package.json", "utf-8")).version + "\n");
}

module.exports = {
    interpret: function (args) {
        var options = argsparser.parse(args),
            targets = typeof options.node === "string" ? null : options.node.slice(1),
            files;

        if (options["-v"] || options["--version"]) {
            _version();
            return;
        }

        if (targets) {
            files = targets.reduce(function (files, target) {
                return files.concat(utils.collect(target));
            }, []);

            processor.compile(files, {
                truncatePrefix: options["--truncate-prefix"],
                namespace: options["--namespace"]
            }, function (washed) {
                var toPath = options["--to"] || options["-t"];
                if (toPath) {
                    fs.writeFileSync(path.join(process.cwd(), toPath), washed, "utf-8");
                } else {
                    process.stdout.write(washed);
                }
            });

            return;
        }

        _help();
    }
};

