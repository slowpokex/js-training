'use strict';
var path = require("path");

module.exports = {
  entry : ["./last-fm-api-task/js/classes/loader",
    "./last-fm-api-task/js/handler",
    "./last-fm-api-task/js/classes/albumInfo",
    "./last-fm-api-task/js/classes/artistInfo",
    "./last-fm-api-task/js/classes/artistList",
    "./last-fm-api-task/js/classes/searchArtist"],
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
