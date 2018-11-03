const exec = require("child_process").exec;
const fs = require("fs");

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json")
    });

    // Default task(s).
    grunt.registerTask("default", ["build"]);

    // Register task(s).
    grunt.registerTask("build", function () {
        const done = this.async();

        exec("tsc", (error) => {
            if (error) {
                throw error;
            }
            
            fs.copyFileSync("src/client/index.html", "dist/client/index.html");
            fs.copyFileSync("src/client/style.css", "dist/client/style.css");

            // Finish task
            done();
        });
    });
};