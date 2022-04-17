const getEnv = require("./tools/getEnv");
const build = require("./tools/build");
const start = require("./tools/start");

const env = getEnv();
if (env !== "dev") {
  //打包模式
  build();
} else {
  //调试模式
  start();
}
