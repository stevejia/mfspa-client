const config = {
  //子应用名称
  appPattern: "privileges",
  //webpack本地调试模式path
  devDomain: "http://localhost",
  //webpack本地调试hosts映射域名(没有http(s))
  natDomain: "nat.mfspa.cc",
  //node中间服务层地址
  nodeHost: "http://node.mfspa.cc/",
  // nodeHost: "http://localhost:8044/",
  //资源上传cdn域名
  cdnHost: "http://cdn.mfspa.cc",
  //父应用地址
  serverHost: "http://www.mfspa.cc",
  //子应用打包上传路径
  uploadPath: "/home/ubuntu/mfspa/mfspaClient/app/",
};
module.exports = config;
