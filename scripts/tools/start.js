const webpackConfig = require("../webpack/webpack.config");
const mime = require("mime");
const express = require("express");
const webpack = require("webpack");
const devMiddleware = require("webpack-dev-middleware");
const hotMiddleware = require("webpack-hot-middleware");
const request = require("request");
const opn = require("opn");
const mfspaConfig = require("../../mfspa.config");
const getEnv = require("../tools/getEnv");
const { appPattern: appName, natDomain, nodeHost, serverHost } = mfspaConfig;
const env = getEnv();
const app = express();
const compiler = webpack(webpackConfig);
//设置跨域访问
app.all("*", (req, res, next) => {
  const { path: urlPath } = req;
  const isHmr = urlPath?.indexOf("__webpack_hmr") > -1;
  const mimeType = mime.getType(urlPath);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  if (isHmr) {
    res.header("Content-Type", "text/event-stream");
  } else {
    if (!!mimeType) {
      res.header("Content-Type", `${mimeType};"charset=utf-8"`);
    } else {
      res.header("Content-Type", "text/html");
    }
  }

  next();
});

app.use(
  devMiddleware(compiler, {
    // publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
    },
  })
);
app.use(hotMiddleware(compiler));
let tryTimes = 10;
const duration = 1000;
let port = 8055;

const listen = () => {
  return new Promise((resolve, reject) => {
    const server = app.listen(port);
    server.on("listening", () => {
      resolve(`app listen at http://localhost:${port}`);
    });
    server.on("error", (err) => {
      if (err.code !== "EADDRINUSE") {
        reject(err);
      }
      port++;
      tryTimes--;
      if (tryTimes > 0) {
        setTimeout(() => {
          server.listen(port);
        }, duration);
      } else {
        reject(err);
      }
    });
  });
};

const compilerDone = (callback) => {
  compiler.hooks.done.tap("done", (stats) => {
    if (
      stats.compilation.errors &&
      stats.compilation.errors.length &&
      env !== "dev"
    ) {
      console.error(stats.compilation.errors);
      process.exit(1);
    }
    console.log("build sucess");
    setTimeout(() => {
      callback && callback();
    }, duration);
  });
};

const updateDebugConfig = async () => {
  return new Promise((resolve, reject)=> {
    const config = {
      appName,
      url: `${natDomain}/webpack/dist/index.js`,
    };
    request({
      url: `${nodeHost}api/v1/debuginfo/update`,
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(config),
    }, (error, response) => {
      if(error){
        reject(error);
        return;
      }
      resolve(response);
    });
  });
  
};
let opened = false;
const start = async () => {
  const result = await listen().catch((err) => {
    console.error(err);
  });
  compilerDone(async () => {
    // console.clear();
    await updateDebugConfig();
    console.log(result);
    if (!opened) {
      opn(`${serverHost}/app/${appName}/module1/page1/detail?test=3333333333`, {
        app: ["chrome"],
      });
      opened = true;
    }
  });
};
module.exports = start;
