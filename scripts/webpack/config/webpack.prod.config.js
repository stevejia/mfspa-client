const HtmlWebpackPlugin = require("html-webpack-plugin");
const Webpackbar = require("webpackbar");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const cwd = process.cwd();

const { getNextVersion } = require("../../tools/updateVersion");

const { appPattern } = require("../../../mfspa.config");
const nextVersion = getNextVersion();
module.exports = {
  entry: [path.join(cwd, "src/index.js")],
  mode: "production",
  output: {
    filename: "index.js",
    path: path.join(cwd, "/dist"),
    publicPath: `http://cdn.mfspa.cc/app/${appPattern}/@${nextVersion}/`,
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: "raw-loader",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.js|jsx|ts|tsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [miniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".html"],
  },
  plugins: [
    // new Webpackbar(),
    new miniCssExtractPlugin({
      filename: "css/index.css",
    }),
  ],
};
