const webpackConfig = require("../webpack/webpack.config");
const mfspaConfig = require("../../mfspa.config");
const updateVersion = require("../tools/updateVersion");
const upload = require("../tools/upload");
const webpack = require("webpack");
const compiler = webpack(webpackConfig);
const build = () => {
  compiler.run(async (err, result) => {
    console.log("打包完成");
    //更新应用版本
    updateVersion();
    //上传打包完成的应用文件
    await upload();
    process.exit();
  });
};

module.exports = build;
