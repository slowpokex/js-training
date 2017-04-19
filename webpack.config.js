'use strict';
var webpack = require("webpack");
var path = require("path");
var glob = require("glob");

module.exports = {
  entry : ["./last-fm-api-task/js/classes/loader",
    "./last-fm-api-task/js/handler",
    "./last-fm-api-task/js/classes/albumInfo",
    "./last-fm-api-task/js/classes/artistInfo",
    "./last-fm-api-task/js/classes/artistList",
    "./last-fm-api-task/js/classes/searchArtist"],//toObject(glob.sync('last-fm-api-task/**/*.js*')),
  output : {
    path: path.resolve(__dirname, 'last-fm-api-task/build'),
    filename: "bundle.js",
    library: "lastFm"
  },
  watch: true,
  devtool: "source-map",

  module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
      ]
    }
};

function toObject(paths) {
  let ret = {};

  paths.forEach(function(path) {
    ret[path.split('/').slice(-1)[0]] = path;
  });
  return ret;
}