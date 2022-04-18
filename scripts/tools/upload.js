const path = require("path");

const fs = require("fs");

const sourceDir = path.resolve("./dist");

const FormData = require("form-data");

const JSZip = require("jszip");
const request = require("request");

const mfspaConfig = require("../../mfspa.config");

const packageJson = require("../../package.json");
const { resolve } = require("path");

const zip = new JSZip();

const getVersion = () => {
  const cwd = process.cwd();
  const packageJsonFilePath = path.join(cwd, "package.json");
  const packageJsonStr = fs.readFileSync(packageJsonFilePath, "utf-8");
  const packageJson = JSON.parse(packageJsonStr);
  const { version } = packageJson;
  return version;
};

const upload = async () => {
  await uploadFiles();
  await updateAppInfo();
};

const uploadFiles = () => {
  return new Promise(async (resolve, reject) => {
    const version = getVersion();
    readDir(sourceDir);
    const data = await zip.generateAsync({
      type: "base64",
      compression: "DEFLATE",
      compressionOptions: {
        level: 9,
      },
    });

    // const zipStream = await zip.generateNodeStream({
    //   type: "base64",
    //   compression: "DEFLATE",
    //   compressionOptions: {
    //     level: 9,
    //   },
    // });
    const formData = new FormData();
    const filePath = `../mfspaClient/app/${mfspaConfig.appPattern}/@${version}`;
    formData.append("data", data);
    formData.append("path", filePath);
    // const formData = {
    //   zipStream: zipStream,
    //   version: packageJson.version,
    //   appName: mfspaConfig.appPattern,
    // };

    console.log(formData);
    const headers = formData.getHeaders();
    // const headers = `multipart/form-data;`;
    request(
      {
        url: `${mfspaConfig.nodeHost}api/v1/app/upload`,
        method: "POST",
        headers,
        // headers: { "content-type": `application/json` },
        body: formData,
      },
      (err, response, body) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(response);
      }
    );
  });
};

const updateAppInfo = () => {
  return new Promise((resolve, reject) => {
    const appVersion = getVersion();
    request(
      {
        url: `${mfspaConfig.nodeHost}api/v1/appinfo/update`,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          appName: mfspaConfig.appPattern,
          appVersion,
          url: `${mfspaConfig.cdnHost}/app/${mfspaConfig.appPattern}/@${appVersion}/index.js`,
          createTime: new Date().getTime(),
          currentUsed: 0,
        }),
      },
      (err, response, body) => {
        if (!!err) {
          reject(err);
          return;
        }
        resolve(response);
      }
    );
  });
};

const readDir = (curPath) => {
  let files = fs.readdirSync(curPath);
  if (files.length > 0) {
    files.forEach((fileName) => {
      const filePath = path.join(curPath, fileName);
      const relativePath = getRelativePath(sourceDir, filePath);
      const fileStat = fs.statSync(filePath);
      if (fileStat.isDirectory()) {
        zip.folder(relativePath);
        readDir(filePath);
        return;
      }
      zip.file(relativePath, fs.readFileSync(filePath));
    });
  }
};

const getRelativePath = (baseDir, fullPath) => {
  return fullPath.split(baseDir)[1];
};

module.exports = upload;
