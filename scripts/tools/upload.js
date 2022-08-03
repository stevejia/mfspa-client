const path = require("path");
const sourceDir = path.resolve("./dist");
const JSZip = require("jszip");
const mfspaConfig = require("../../mfspa.config");
const request = require("./request");
const { getVersion, zipReadDir, getFormData } = require("./utils");

/**
 * 上传打包后的文件以及跟新版本号到数据库
 */
const upload = async () => {
  await uploadFiles();
  await updateAppInfo();
};

/**
 * 上传打包后文件到数据库
 */
const uploadFiles = async () => {
  const version = getVersion();
  const zipStream = await getZipStream(sourceDir);
  const filePath = `${mfspaConfig.uploadPath}${mfspaConfig.appPattern}/@${version}/`;
  const { formData, headers } = getFormData({
    data: zipStream,
    path: filePath,
  });
  await request.post("api/v1/app/upload", formData, { headers });
};

/**
 * 通过JSZIP生成base64格式的压缩文件字符串
 * @returns zipStream {string} 返回base64格式的的文件流
 */
const getZipStream = async (sourceDir) => {
  const zip = new JSZip();
  zipReadDir(sourceDir, zip);
  const zipStream = await zip.generateAsync({
    type: "base64",
    compression: "DEFLATE",
    compressionOptions: {
      level: 9,
    },
  });
  return zipStream;
};

/**
 * 更新数据库子应用发布版本信息
 */
const updateAppInfo = () => {
  return new Promise((resolve, reject) => {
    const appVersion = getVersion();
    const params = {
      appName: mfspaConfig.appPattern,
      appVersion,
      url: `${mfspaConfig.cdnHost}/app/${mfspaConfig.appPattern}/@${appVersion}/index.js`,
      createTime: new Date().getTime(),
      currentUsed: 0,
    };
    request.post(`api/v1/appinfo/update`, params);
  });
};
module.exports = upload;
