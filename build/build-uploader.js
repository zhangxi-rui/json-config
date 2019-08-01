/* eslint-disable*/

var fs = require('fs')
var Url = require('url')
var Path = require('path')
var outputPath = ''

function BuildUpload(options) {
  this.options = options || {}
  console.log(
    '\n\n\n===============================================\n' +
      '开始推送代码，地址：' +
      options.receiver +
      '\n===============================================\n\n\n'
  )
}

BuildUpload.prototype.apply = function(compiler) {
  var _this = this
  if (process.env.NODE_ENV === 'production') {
    compiler.plugin('done', function(stats) {
      outputPath = compiler.outputPath
      directoryUpload(outputPath, _this.options.receiver, _this.options.toPath)
    })
  } else {
    return
  }
}

function padStart(str, length, padStr) {
  str = '' + str
  if (str.length < length) {
    for (var i = 0; i < length - str.length; i++) {
      str = padStr + str
    }
  }
  return str
}

function directoryUpload(filePath, receiver, toPath) {
  console.log('directoryUpload')

  var sep = Path.sep
  fs.readdir(filePath, function(err, files) {
    files.forEach(function(item, index) {
      var currentPath = filePath + sep + item
      if (fs.statSync(currentPath).isFile()) {
        var outputPathSep = outputPath.split(sep)
        var pathSep = currentPath.split(sep)
        var resolvePath = pathSep.slice(outputPathSep.length).join('/')
        var fullToPath = toPath + '/' + resolvePath
        var date = new Date()
        var fileCon
        if (/\.(png|jpe?g|gif|svg|wav)(\?.*)?$/.test(currentPath)) {
          fileCon = fs.readFileSync(currentPath)
        } else {
          fileCon = fs.readFileSync(currentPath, 'utf8')
        }
        fileUpload(
          receiver,
          {},
          {
            to: fullToPath
          },
          fileCon,
          item,
          function(res, body) {
            console.log(
              '【' +
                padStart(date.getHours(), 2, '0') +
                ':' +
                padStart(date.getMinutes(), 2, '0') +
                ':' +
                padStart(date.getSeconds(), 2, '0') +
                '】  ' +
                resolvePath +
                '>>>>' +
                fullToPath
            )
            // console.log(res)
            // console.log(body)
          }
        )
      } else if (fs.statSync(currentPath).isDirectory()) {
        directoryUpload(currentPath, receiver, toPath)
      }
    })
  })
}

/**
 * 遵从RFC规范的文件上传功能实现
 * @param  {String}   url      上传的url
 * @param  {Object}   opt      配置
 * @param  {Object}   data     要上传的formdata，可传null
 * @param  {String}   content  上传文件的内容
 * @param  {String}   subpath  上传文件的文件名
 * @param  {Function} callback 上传后的回调
 * @memberOf fis.util
 * @name upload
 * @function
 */
function fileUpload(url, opt, data, content, subpath, callback) {
  if (typeof content === 'string') {
    content = new Buffer(content, 'utf8') // eslint-disable-line
  } else if (!(content instanceof Buffer)) {
    // fis.log.error('unable to upload content [%s]', (typeof content));
  }
  opt = opt || {}
  data = data || {}
  var endl = '\r\n'
  var boundary = '-----np' + Math.random()
  var collect = []
  _map(data, function(key, value) {
    collect.push('--' + boundary + endl)
    collect.push('Content-Disposition: form-data; name="' + key + '"' + endl)
    collect.push(endl)
    collect.push(value + endl)
  })
  collect.push('--' + boundary + endl)
  collect.push('Content-Disposition: form-data; name="' + (opt.uploadField || 'file') + '"; filename="' + subpath + '"' + endl)
  collect.push(endl)
  collect.push(content)
  collect.push(endl)
  collect.push('--' + boundary + '--' + endl)

  var length = 0
  collect.forEach(function(ele) {
    if (typeof ele === 'string') {
      length += new Buffer(ele).length
    } else {
      length += ele.length
    }
  })

  opt.method = opt.method || 'POST'
  opt.headers = Object.assign(
    {
      'Content-Type': 'multipart/form-data; boundary=' + boundary,
      'Content-Length': length
    },
    opt.headers || {}
  )
  opt = _parseUrl(url, opt)
  var http = opt.protocol === 'https:' ? require('https') : require('http')
  var req = http.request(opt, function(res) {
    var status = res.statusCode
    var body = ''
    res
      .on('data', function(chunk) {
        body += chunk
      })
      .on('end', function() {
        if ((status >= 200 && status < 300) || status === 304) {
          callback(null, body)
        } else {
          callback(status)
        }
      })
      .on('error', function(err) {
        callback(err.message || err)
      })
  })
  collect.forEach(function(d) {
    req.write(d)
  })
  req.end()
}
/**
 * 对象枚举元素遍历，若merge为true则进行_.assign(obj, callback)，若为false则回调元素的key value index
 * @param  {Object}   obj      源对象
 * @param  {Function|Object} callback 回调函数|目标对象
 * @param  {Boolean}   merge    是否为对象赋值模式
 * @memberOf fis.util
 * @name map
 * @function
 */
function _map(obj, callback, merge) {
  var index = 0
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (merge) {
        callback[key] = obj[key]
      } else if (callback(key, obj[key], index++)) {
        break
      }
    }
  }
}
/**
 * url解析函数，规则类似require('url').parse
 * @param  {String} url 待解析的url
 * @param  {Object} opt 解析配置参数 { host|hostname, port, path, method, agent }
 * @return {Object}     { protocol, host, port, path, method, agent }
 * @memberOf fis.util
 * @name parseUrl
 * @function
 */
function _parseUrl(url, opt) {
  opt = opt || {}
  url = Url.parse(url)
  var ssl = url.protocol === 'https:'
  opt.host = opt.host || opt.hostname || (ssl || url.protocol === 'http:' ? url.hostname : 'localhost')
  opt.port = opt.port || (url.port || (ssl ? 443 : 80))
  opt.path = opt.path || url.pathname + (url.search ? url.search : '')
  opt.method = opt.method || 'GET'
  opt.agent = opt.agent || false
  return opt
}

module.exports = BuildUpload
