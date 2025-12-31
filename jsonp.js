const { http, url, path, fs, multiparty, querystring } = require('./modules/httpRequire')

http.createServer(function(req, res) {
  const pathname = url.parse(req.url).pathname;
  const method = req.method.toUpperCase();

  if (pathname === '/jsonp') {
    let params = url.parse(req.url, true).query
    console.log(params)
    let data = JSON.stringify({ a: 1, b: 2 })
    // window['functionName']()
    res.write(`window['${params.callback}']('${data}')`)
    res.end()
  }

}).listen(8085, function() {
  console.log('8085启动')
})