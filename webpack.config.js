'use strict';
const path = require("path");
const webpack = require("webpack");

module.exports = {
  context: path.resolve(__dirname, 'last-fm-api-task/js'),

  entry : ["./classes/loader",
    "./handlers/mainHandler",
    "./classes/albumInfo",
    "./classes/artistInfo",
    "./classes/artistList",
    "./classes/searchArtist"],

  output : {
    path: path.resolve(__dirname, 'last-fm-api-task/build'),
    publicPath: "/",
    filename: "bundle.js",
    library: "[name]"
  },

  watch: true,

  devtool: "source-map",

  watchOptions: {
    aggregateTimeout: 100,
    poll: 1000
  },

  resolve: {
    modules: ["node_modules"],
    descriptionFiles: ["package.json"],
    extensions: [".js", ".json"]
  },

  plugins: [
    new webpack.NodeEnvironmentPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],

  resolveLoader: {
    modules: ["node_modules"],
    moduleExtensions: ['.js', '.json']
  },

  module: {
      rules: [
        {
          //language=JSRegexp
          test: /\.js$/,
          //language=JSRegexp
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader"
        }
      ]
    }
};
