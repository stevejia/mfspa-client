const path = require("path");
const fs = require("fs");
const FormData = require("form-data");

const detectPlatform = () => {
  const platform = process.platform;
  return platform;
};

/**
 * 返回版本号
 * @returns version {string}
 */
const getVersion = () => {
  const cwd = process.cwd();
  const packageJsonFilePath = path.join(cwd, "package.json");
  const packageJsonStr = fs.readFileSync(packageJsonFilePath, "utf-8");
  const packageJson = JSON.parse(packageJsonStr);
  const { version } = packageJson;
  return `${version}`;
};

/**
 * 循环打包路径，路径/文件添加的zip中，用于打包
 * @param {*} curPath 当前要压缩的文件夹/文件路径
 */
const zipReadDir = (curPath, zip) => {
  let files = fs.readdirSync(curPath);
  if (files.length > 0) {
    files.forEach((fileName) => {
      const filePath = path.join(curPath, fileName);
      const relativePath = getRelativePath(curPath, filePath);
      const fileStat = fs.statSync(filePath);
      if (fileStat.isDirectory()) {
        zip.folder(relativePath);
        zipReadDir(filePath, zip);
        return;
      }
      zip.file(relativePath, fs.readFileSync(filePath));
    });
  }
};

/**
 * 返回相对的路径
 * @param {*} baseDir 基础path
 * @param {*} fullPath 完整路径
 * @returns 返回相对路径
 */
const getRelativePath = (baseDir, fullPath) => {
  return fullPath.split(baseDir)[1];
};

/**
 * create form data instance for post request
 * @param {*} data from zip stream path for remote path
 * @returns
 */
const getFormData = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  return { formData, headers: formData.getHeaders() };
};

module.exports = { detectPlatform, getVersion, zipReadDir, getFormData };
