// Create web server
// 1. Load modules
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

// 2. Create web server
var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url);
  var resource = parsedUrl.pathname;
  console.log('resource = ' + resource);

  // 3. Process request
  if (resource == '/create') {
    // 3.1. Read 'create.html' file
    fs.readFile('create.html', 'utf-8', function (error, data) {
      // 3.1.1. Send HTML form
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(data);
    });
  } else if (resource == '/create_process') {
    // 3.2. Read POST data from HTML form
    request.on('data', function (data) {
      // 3.2.1. Parse POST data
      var postData = qs.parse(data.toString());
      var title = postData.title;
      var description = postData.description;

      // 3.2.2. Send 302 response
      response.writeHead(302, { Location: `/?id=${title}` });
      response.end();
    });
  } else if (resource == '/') {
    // 3.3. Read 'index.html' file
    fs.readFile('index.html', 'utf-8', function (error, data) {
      // 3.3.1. Read 'description' from query string
      var query = qs.parse(parsedUrl.query);
      var title = query.id;
      var description = 'Hello, Node.js';

      // 3.3.2. Send HTML
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(data);
    });
  } else {
    // 3.4. Error: 404 Not found
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end('404 Not found');
  }
});

// 4. Start server
server.listen(3000, function () {
  console.log('Server running at http://localhost:3000');
});