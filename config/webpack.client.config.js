const path = require("path");

module.exports = {
    entry: "./src/client/core/game.ts",

    output: {
        filename: "game.js",
        path: path.resolve(__dirname, "../", "dist", "client")
    },

    mode: "development",

    resolve: {
        extensions: [".ts", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: [/node_modules/, /server/]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i, 
                loader: "file-loader?name=./assets/[name].[ext]"
            }
        ]
    },
};