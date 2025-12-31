const url = require('url');
const path = require('path');
const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const multiparty = require('multiparty')  // npm 处理请求内容为 form Data 的 request

module.exports = {
  url,
  path,
  http,
  querystring,
  fs,
  multiparty
}