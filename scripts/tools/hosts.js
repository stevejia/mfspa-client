const { detectPlatform } = require("./utils");
const fs = require("fs");
/**
 * 映射本地localhost到特定的域名
 * 用于起webpack调试模式
 * @param {string} domain
 */
const reflectDomain = (domain) => {
  const platform = detectPlatform();
  //默认windows的hosts文件路径
  let hostsPath = "C:/Windows/System32/drivers/etc/hosts";
  if (platform === "darwin") {
    //mac的文件路径
    hostsPath = "/etc/hosts";
  } else if (platform === "linux") {
    //linux系统文件路径
    hostsPath = "/etc/hosts";
  }

  //读取hosts文件
  let content = fs.readFileSync(hostsPath, "utf8");
  //如果没有包含映射的域名
  if (content.indexOf(domain) === -1) {
    content += `\n127.0.0.1 ${domain}`;
  }
  fs.writeFileSync(hostsPath, content, "utf8");
};

module.exports = reflectDomain;
