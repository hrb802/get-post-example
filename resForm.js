/*
 * @Author: HeRuibin
 * @Date: 2025-12-29 23:28:26
 * @LastEditors: HeRuibin
 * @LastEditTime: 2025-12-30 00:04:06
 * @FilePath: \何蕊彬_Node_20251229\resForm.js
 */
const {url, path, http, querystring, fs, multiparty} = require('./modules/httpRequire')

const uploadPath = path.join(__dirname , '/upload')
console.log(uploadPath);

http.createServer(function(req, res) {
  let { pathname, query, search, host, port } = url.parse(req.url)
  let method = req.method.toUpperCase()
  let contentType = req.headers['content-type']

  //设置允许跨域的域名，*代表允许任意域名跨域
  res.setHeader("Access-Control-Allow-Origin", "*");
  //我容许跟我不同源的页面像我发起请求
  //允许的header类型
  res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,Authorization,token, content-type');
  //跨域允许的请求方式
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
  //可选，用来指定本次预检请求的有效期，单位为秒。在此期间，不用发出另一条预检请求。
  res.setHeader('Access-Control-Max-Age', 1728000);//预请求缓存20天

  res.writeHead(200, {'content-type': 'text/plain;charset=utf8'})

  if (method === 'OPTIONS') {
    console.log('options 预验请求')
    res.end('ok')
    return false
  }

  if (!(/upload/.test(pathname))) {
    res.write('非upload请求')
    res.end()
    return false;
  }
  
  contentType = shuntContentType(mime(contentType))
  // console.log(contentType);
  if (contentType !== 'form') {
    res.end('请求内容类型非 multipart/form-data')
    return false;
  }

  if (method === 'POST') {
    let form = new multiparty.Form({
      uploadDir: uploadPath
    })
    form.parse(req, function(err, fields, files) {
      if(err) {
        throw err;
      }

      if (fields) {
        console.log(fields);
      }

      if (files) {
        console.log(files);
        res.end(JSON.stringify({
          'statusCode': 2000,
          'msg': 'ok'
        }))
      }
    })
  }

}).listen(8085, function() {
  console.log('8085 服务启动 form文件上传')
})

function shuntContentType (type) {
  const contentType = {
    'application/x-www-form-urlencoded': 'url', 
    'multipart/form-data': 'form', 
    'text/plain': 'text', 
    'application/json': 'json' 
  }
  return contentType[type]
}
//application/json

function mime (type) {
  return type?.split(';')[0]
}

function isJSON (str) {
  try {
    JSON.parse(str)
    return true;
  } catch (err) {
    return false;
  }
}
