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
const env = getEnv();
const app = express();
const {
  appPattern: appName,
  devDomain,
  natDomain,
  nodeHost,
  serverHost,
} = mfspaConfig;

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

const compilerDone = (compiler, callback) => {
  compiler.hooks.done.tap("done", (stats) => {
    if (
      stats.compilation.errors &&
      stats.compilation.errors.length &&
      env !== "dev"
    ) {
      console.error(stats.compilation.errors);
      process.exit(1);
    }
    setTimeout(() => {
      callback && callback();
    }, duration);
  });
};

const updateDebugConfig = async () => {
  const config = {
    appName,
    url: `${natDomain}/webpack/dist/index.js`,
  };
  return new Promise((resolve, reject) => {
    request(
      {
        url: `${nodeHost}api/v1/debuginfo/update`,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(config),
      },
      (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      }
    );
  }).catch((error) => {
    console.log(error);
  });
};

let opened = false;
const start = async () => {
  const compiler = webpack(webpackConfig);
  const reflectDomain = require("./hosts");

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

  console.log("start");
  const result = await listen().catch((err) => {
    console.error(err);
  });
  compilerDone(compiler, async () => {
    // console.clear();
    reflectDomain(natDomain);
    await updateDebugConfig();
    console.log(result);
    setTimeout(async () => {
      if (!opened) {
        opn(`${serverHost}/app/${appName}/base/overall`, {
          app: ["chrome"],
        });
        opened = true;
      }
    }, duration);
  });
};
module.exports = start;
