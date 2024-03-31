// Create web server
// Create a route to the comments
// Use a form to submit comments
// Store comments in a file
// Display comments on the page

// To run the server:
// node comments.js

// To access the server:
// http://localhost:3000/

// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var qs = require('querystring');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  if (request.method == 'POST') {
    var body = '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      var post = qs.parse(body);
      fs.appendFile('comments.txt', post.comment + '\n', function (err) {
        if (err) throw err;
        console.log('Comment saved!');
      });
    });
  }

  fs.readFile('comments.txt', function (err, data) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<form method="post">');
    response.write('<textarea name="comment"></textarea>');
    response.write('<input type="submit" value="Submit">');
    response.write('</form>');
    response.write('<h1>Comments</h1>');
    response.write('<ul>');
    var comments = data.toString().split('\n');
    for (var i in comments) {
      response.write('<li>' + comments[i] + '</li>');
    }
    response.write('</ul>');
    response.end();
  });
});

// Listen on port 3000, IP defaults to