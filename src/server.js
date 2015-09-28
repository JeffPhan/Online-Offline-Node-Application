var http = require('http');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');

var port = 8080;

var sendIndexHTML = function(response) {
  var fileContent = fs.readFileSync('./index.html');
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(fileContent);  
}

var sendJS = function(response) {
  var fileContent = fs.readFileSync('javascripts/script.js');
  response.writeHead(200, {'Content-Type': 'application/javascript'});
  response.end(fileContent);  
}

var sendManifest = function(response) {
  var fileContent = fs.readFileSync('myManifest.appcache');
  response.writeHead(200, {'Content-Type': 'text/appcache'});
  response.end(fileContent);  
}

var sendCSS = function(response) {
  var fileContent = fs.readFileSync('css/main.css');
  response.writeHead(200, {'Content-Type': 'text/css'});
  response.end(fileContent);  
}

var sendFiles = function(request, response) {
  //console.log(request.url);
  if(request.url === '/') {
    sendIndexHTML(response);
  } else if(request.url === '/javascripts/script.js') {
    sendJS(response);
  } else if(request.url === '/myManifest.appcache') {
    sendManifest(response);
  } else if(request.url === '/css/main.css') {
    sendCSS(response);
  } else
    response.end();
}

var handler = function(request, response) {
  if(request.method === 'GET') {
    //console.log("Get request: ");
    sendFiles(request, response);
  }
  else {
    if(request.method === 'POST') {
      //console.log("Post request: ");
      var form =  '';
      request.on("data", function(data){
        form += data;
      });

      request.on("end", function(){
          console.log(form);
          response.end();
      });
    }
  }
}

var server = http.createServer(handler).listen(port);
console.log("Starting server...");