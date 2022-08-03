const webpackConfig = require("../webpack/webpack.config");
const mfspaConfig = require("../../mfspa.config");
const { updateVersion } = require("../tools/updateVersion");
const upload = require("../tools/upload");
const webpack = require("webpack");
const compiler = webpack(webpackConfig);

const build = () => {
  compiler.run(() => {
    console.log("打包完成");
    //更新应用版本
    updateVersion();
    await upload();
  });
};
module.exports = build;
