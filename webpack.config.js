var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
//var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var HtmlWebPackPlugin = require("html-webpack-plugin");

var htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./src/assets/js/main.js",
  output: {
    path: __dirname + "/js",
    filename: "main.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: true }),
    htmlPlugin
  ],
   module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};