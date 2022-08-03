const devConfig = require("./config/webpack.dev.config");
const prodConfig = require("./config/webpack.prod.config");
const getEnv = require("../tools/getEnv");
const { devDomain } = require("../../mfspa.config");
const env = getEnv();

/**
 * 根据环境参数获取webpack参数
 * @param {*} param0 port 动态附加webpack devServer的端口
 * @returns
 */
const getWebpackConfig = ({ port = 0 } = {}) => {
  let config = prodConfig;
  if (env === "dev") {
    config = devConfig;
    const entry = [
      "webpack/hot/dev-server",
      `webpack-hot-middleware/client?path=${devDomain}:${port}/__webpack_hmr`,
      "./src/index.js",
    ];
    devConfig.entry = entry;
    devConfig.output.publicPath = `${devDomain}:${port}/webpack/dist`;
  }
  return config;
};
module.exports = getWebpackConfig;
