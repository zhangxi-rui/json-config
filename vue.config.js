'use strict'
const apiMocker = require('mocker-api')
const path = require('path')
const pkg = require('./package.json')
let BuildUploader = require('./build/build-uploader.js')
const SERVER_LIST = require('./build/server-list.js')
const { getArgv, assetsPath } = require('./build/utils.js')
const merge = require('webpack-merge')

const port = 8081
const title = pkg.title

// 测试服务器地址
let testAddress = getArgv()
console.log(testAddress)

if (process.env.NODE_ENV === 'production' && /test/.test(testAddress)) {
  process.env.VUE_APP_HOSTAPI = `http://${testAddress}.suanshubang.com/`
}
process.env.VUE_APP_PORT = port

module.exports = {
  lintOnSave: false,
  publicPath: './', // 相对于index.html文件找静态资源路径
  outputDir: 'dist',
  assetsDir: './static', // 静态资源目录(js,css,fonts)
  productionSourceMap: false,
  chainWebpack: config => {
    config.output.filename = assetsPath('js/[name].[chunkhash].js')
    config.output.chunkFilename = assetsPath('js/[id].[chunkhash].js')
    config.module
      .rule('fonts')
      .use('url-loader')
      .tap(options => {
        options.name = assetsPath('/fonts/[name].[hash:8].[ext]')
      })
  },
  configureWebpack: config => {
    config.name = title
    if (process.env.NODE_ENV === 'production' && /test/.test(testAddress)) {
      config.plugins.push(new BuildUploader(SERVER_LIST[testAddress]))
    }
    config.devtool = process.env.NODE_ENV === 'production' ? '#source-map' : '#cheap-module-eval-source-map'
  },
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: port,
    https: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // yapi mock
      '/paybalance': {
        target: 'http://yapi.afpai.com/mock/274/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/mock': '/'
        }
      }
    }
    // before (app) {
    //   apiMocker(app, path.resolve('./mocker/index.js'), {
    //     proxy: {
    //       '/mock/*': `http://localhost:${port}/`
    //     },
    //     changeHost: true
    //   })
    // }
  }
}
