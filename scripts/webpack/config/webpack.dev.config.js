const webpack = require("webpack");
const Webpackbar = require("webpackbar");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const cwd = process.cwd();
const { devDomain } = require("../../../mfspa.config");
module.exports = {
  entry: [
    "webpack/hot/dev-server",
    `webpack-hot-middleware/client?path=${devDomain}/__webpack_hmr`,
    "./src/index.js",
  ],
  mode: "development",
  output: {
    filename: "index.js",
    path: path.join(cwd, "/dist"),
    publicPath: `${devDomain}/webpack/dist`,
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: "raw-loader",
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
    new Webpackbar(),
    new miniCssExtractPlugin({
      filename: "css/index.css",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: "eval-source-map",
};
