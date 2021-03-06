// const path = require("path");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
//
// const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
//   template: './src/index.html',
//   filename: 'app.html',
//   inject: 'body',
//   files: {
//     css: ['style.css'],
//     js: [ "bundle.js"],
//   }
// });
//
// module.exports = {
//   entry: "./src/index.jsx",
//   output: {
//     publicPath: '/',
//     filename: "bundle.js",
//     path: path.resolve(__dirname, "dist")
//   },
//   devServer: {
//     contentBase: "./src",
//     hot: true
//   },
//   resolve: {
//     extensions: ['.js', '.jsx']
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.js$/,
//         loader: "babel-loader",
//         exclude: /node_modules/,
//         query: {
//           presets: ["es2015", "react"]
//         }
//       },
//       {
//         test: /\.(sass|scss)$/,
//         exclude: /node_modules/,
//         loader: ExtractTextPlugin.extract(["css-loader", "sass-loader"])
//       },
//       {
//         test: /\.css$/,
//         use: ExtractTextPlugin.extract({
//           fallback: "style-loader",
//           use: "css-loader"
//         })
//       }
//     ]
//   },
//
//   plugins: [
//     new ExtractTextPlugin("public/style.css", {
//       allChunks: true
//     }),
//     HtmlWebpackPluginConfig
//   ]
// };

"use strict";
var webpack = require("webpack");
var path = require("path");
var loaders = require("./webpack.loaders");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var DashboardPlugin = require("webpack-dashboard/plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";

loaders.push({
  test: /\.scss$/,
  loaders: ["style-loader", "css-loader?importLoaders=1", "sass-loader"],
  exclude: ["node_modules"]
});

module.exports = env =>
{
  return {
    entry: [
      "react-hot-loader/patch",
      "./src/index.js", // your app's entry point
    ],
    devtool: process.env.WEBPACK_DEVTOOL || "eval-source-map",
    output: {
      publicPath: "/",
      path: path.join(__dirname, "dist"),
      filename: "bundle.js"
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    module: {
      loaders
    },
    devServer: {
      contentBase: "./dist",
      // do not print bundle build stats
      noInfo: true,
      // enable HMR
      hot: true,
      // embed the webpack-dev-server runtime into the bundle
      inline: true,
      // serve index.html in place of 404 responses to allow HTML5 history
      historyApiFallback: true,
      port: PORT,
      host: HOST
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: env.DEV
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin({
        filename: "style.css",
        allChunks: true
      }),
      new DashboardPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        files: {
          css: ["style.css"],
          js: [ "bundle.js"],
        }
      }),
    ]
  };
};
