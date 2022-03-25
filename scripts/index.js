const webpackConfig = require("./webpack/webpack.config");
const express = require("express");
const webpack = require("webpack");
const devMiddleware = require("webpack-dev-middleware");
const hotMiddleware = require("webpack-hot-middleware");
const mime = require("mime");
const compiler = webpack(webpackConfig);
const getEnv = require("./tools/getEnv");
const request = require("request");
const opn = require("opn");
// const { appPattern: appName } = require("../mfspa.config");
const appName = "testA";
const env = getEnv();
console.log(env);
if (env !== "dev") {
  // compiler.watch({}, (err, result) => {
  //   console.log(err);
  // });
  compiler.run((err, result) => {
    console.log(err);
    console.log("打包完成");
    process.exit();
  });
}
const path = require("path");
const cwd = process.cwd();
const dist_dir = path.join(cwd, "dist");
const app = express();
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
// app.get("*", (req, res, next) => {
//   const filename = path.join(dist_dir, "index.html");

//   compiler.outputFileSystem.readFile(filename, (err, result) => {
//     if (err) {
//       return next(err);
//     }
//     res.send(result);
//     res.end();
//   });
// });
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
  const config = {
    appName,
    url: `http://localhost:${port}/webpack/dist/index.js`,
  };
  await request({
    url: "http://localhost:8044/api/v1/debugconfig/update",
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(config),
  });
};
let opened = false;
const main = async () => {
  const result = await listen().catch((err) => {
    console.error(err);
  });
  compilerDone(async () => {
    console.clear();
    await updateDebugConfig();
    console.log(result);
    if (!opened) {
      opn(
        "http://www.mfspa.com/app/testA/module1/page1/detail?test=3333333333",
        {
          app: ["chrome"],
        }
      );
      opened = true;
    }
  });
};

main();
