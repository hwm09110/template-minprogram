// 导入各个模块接口

const requireModules = require.context('./', true, /^.\/.*\/.*\.js$/);
const allApi = requireModules.keys().map(filePath => requireModules(filePath)["default"]);
// console.log(allApi);

export default Object.assign({}, ...allApi)
