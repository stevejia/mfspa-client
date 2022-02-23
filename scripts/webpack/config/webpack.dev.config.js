const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const cwd = process.cwd();
module.exports = {
  entry: [
    "webpack/hot/dev-server",
    "webpack-hot-middleware/client?path=http://localhost:8055/__webpack_hmr",
    "./src/index.js",
  ],
  mode: "development",
  output: {
    filename: "index.js",
    path: path.join(cwd, "/dist"),
    publicPath: "http://localhost:8055/webpack/dist",
  },
  module: {
    rules: [
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
    new miniCssExtractPlugin({
      filename: "css/index.css",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: "source-map",
};
