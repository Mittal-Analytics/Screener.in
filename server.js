"use strict";
/* global console */
var fs = require('fs');
var http = require('http');
var httpProxy = require('http-proxy');


function onError(e) {
  console.log(e);
}

var options = {
  autoRewrite: true,
  changeOrigin: true,
  target:'http://www.screener.in',
};
var proxy = httpProxy.createProxyServer(options);
proxy.on('error', onError);

http.createServer(function(req, res) {
  console.log('URL:', req.url);
  if(req.url.startsWith('/static/app.')) {
    fs.readFile('./bundle/main.js', function(err, data) {
      res.writeHead(200);
      res.end(data);
    });
  } else {
    proxy.web(req, res);
  }
}).listen(8000);

console.log("Open: http://127.0.0.1:8000 in browser");
