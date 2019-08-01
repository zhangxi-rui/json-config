const path = require('path')

/**
 * @description: 本地构建推送代码测试地址
 * @param {type}
 * @return: 测试地址
 */
exports.getArgv = function () {
  let argv
  try {
    argv = JSON.parse(process.env.npm_config_argv).original
  } catch (e) {
    argv = process.argv
  }
  if (argv) {
    return argv
      .toString()
      .split(',')
      .pop()
  }
  return ''
}

/**
 * @description: 静态资源地址
 * @param {type}
 * @return:
 */
exports.assetsPath = function (_path) {
  return path.posix.join('./static', _path)
}
