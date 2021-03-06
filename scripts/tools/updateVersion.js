const fs = require("fs");

const path = require("path");

const cwd = process.cwd();
const updateVersion = () => {
  const packageJsonFilePath = path.join(cwd, "package.json");
  const packageJsonStr = fs.readFileSync(packageJsonFilePath, "utf-8");
  const packageJson = JSON.parse(packageJsonStr);
  const { version } = packageJson;
  const versionArr = version.split(".");
  let lastVersion = versionArr.pop();

  lastVersion = parseInt(lastVersion) + 1;
  versionArr.push(lastVersion);
  packageJson.version = versionArr.join(".");
  fs.writeFileSync(
    packageJsonFilePath,
    JSON.stringify(packageJson, null, 2),
    "utf-8"
  );
};

const getVersion = () => {
  const cwd = process.cwd();
  const packageJsonFilePath = path.join(cwd, "package.json");
  const packageJsonStr = fs.readFileSync(packageJsonFilePath, "utf-8");
  const packageJson = JSON.parse(packageJsonStr);
  const { version } = packageJson;
  return version;
};

const getNextVersion = (currentVersion = null) => {
  if (!currentVersion) {
    currentVersion = getVersion();
  }
  const verList = currentVersion.split(".");
  let lastVer = parseInt(verList.pop());
  ++lastVer;
  verList.push(lastVer);
  return verList.join(".");
};

module.exports = { updateVersion, getVersion, getNextVersion };
