const portfinder = require("portfinder");
const getWebpackConfig = require("./webpack.config.base.js");

module.exports = async (env, argv) => {
  const config = await getWebpackConfig(env, argv);

  // 空いているポート番号のベースとなるポート番号の設定
  portfinder.basePort = config.devServer.port;

  // ポート番号を割り当てる
  const port = await portfinder.getPortPromise();

  config.devServer.port = port;

  return config;
};
