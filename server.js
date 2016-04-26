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
  target:'http://www.screener.in'
};
var proxy = httpProxy.createProxyServer(options);
proxy.on('error', onError);

http.createServer(function(req, res) {
  console.log('URL:', req.url);
  if(req.url == '/static/bundle.js.map') {
    fs.readFile('./bundle.map.js', function(err, data) {
      res.writeHead(200);
      res.end(data);
    });
  } else if(req.url.startsWith('/static/bundle.')) {
    fs.readFile('./bundle.js', function(err, data) {
      res.writeHead(200);
      res.end(data);
    });
  } else {
    proxy.web(req, res);
  }
}).listen(8000);

console.log([
    "Ready to accept requests.",
    "Open: http://127.0.0.1:8000 in browser."
].join('\n'));
