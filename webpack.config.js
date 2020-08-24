/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const paths = {
    src: path.resolve(__dirname, "src"),
    dist: path.resolve(__dirname, "dist"),
};

module.exports = (env, argv) => {
    const devMode = argv.mode !== "production";

    return {
        entry: path.join(paths.src, "index.tsx"),
        mode: devMode ? "development" : "production",
        devtool: devMode ? "source-map" : "",
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: ["ts-loader", "eslint-loader"],
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    loader: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 1,
                                modules: {
                                    localIdentName:
                                        "[name]__[local]--[hash:base64:5]",
                                },
                            },
                        },
                        "sass-loader",
                    ],
                },
                {
                    test: /\.css$/,
                    loader: [MiniCssExtractPlugin.loader, "css-loader"],
                },
                {
                    test: /\.(woff2?|eot|ttf|svg|jpe?g|png|gif)(\?.+)?$/,
                    loader: "file-loader",
                    options: {
                        name(file) {
                            if (devMode) return "[path][name].[ext]";
                            return "[contenthash].[ext]";
                        },
                    },
                },
                {
                    test: /lang\/index\.json?$/,
                    exclude: /node_modules/,
                    loader: ["./loaders/glob-loader.js"],
                },
            ],
        },
        output: {
            path: paths.dist,
            filename: devMode ? "[name].js" : "[name].[hash].js",
            chunkFilename: devMode ? "[id].js" : "[id].[hash].js",
            publicPath: "/",
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".scss", ".json"],
            modules: ["node_modules", paths.src],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(paths.src, "index.html"),
                filename: "index.html",
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: devMode ? "[name].css" : "[name].[hash].css",
                chunkFilename: devMode ? "[id].css" : "[id].[hash].css",
            }),
            new webpack.DefinePlugin({
                __DEVELOPMENT__: devMode,
            }),
        ],
    };
};
