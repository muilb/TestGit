// var http = require('http');
// http.createServer(function(req, res){
//    var html = "BoilerplateHello World";
//    res.writeHead(200, {
//       'Content-Type' : 'text/html', 'Content-Length' : html.length
//    });
//    res.end(html);
// }).listen(8000,'127.0.0.1');
var http = require('http');
var fs = require('fs');
var path = require('path');

//var index = fs.readFileSync('index.html', "utf8");

http.createServer(function(req, res){
  var viewdir = 'views';
  var filename;// = path.basename(req.url) || 'index.html';
  if (req.url == '/') {
    filename = '/index.html'
  } else {
    filename = req.url;
  }
  //console.log(req.url);
  //var ext = path.extend(filename);
  //var localpath = __dirname + viewdir;
  res.writeHead(200);
  var html = fs.readFileSync(viewdir + filename);
  res.write(html);
  //res.writeHead(200, {'Content-Type': 'text/html'});
  res.end();
}).listen(8989, '127.0.0.1'); //listen(8989, '127.0.0.1');

console.log("start at 8989");
