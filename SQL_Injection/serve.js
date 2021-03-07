// Built-in
var http = require('http');
var fs = require('fs');

// Custom
var dt = require('./SQL_scripts/dbModule.js');

http.createServer(function (req, res) {
//  res.writeHead(200, {'Content-Type': 'text/html'});
//  res.write("The date and time are currently: " + dt.myDateTime());
//  res.write(req.url);
//  res.end();
//  var q = url.parse(req.url, true).query;
//  var txt = q.year + " " + q.month;
    if(req.method == "GET") {
        console.log("received GET request.")
        fs.readFile('./Pages/login.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    }
    else if(req.method == "POST") {
        console.log("received POST request.");
        var body = ''
        req.on('data', function(data) {
            body += data
            // console.log('Partial body: ' + body)
          })
          req.on('end', function() {
            var vals = body.split("&") //[ 'uname=asdf', 'psw=qwerty' ]
            var username = vals[0].split("=")[1]
            var password = vals[1].split("=")[1]

            res.writeHead(200, {'Content-Type': 'text/html'})

            // Query Database
            if (username == 'asdf' && password == 'qwerty') {
                // Show page
                console.log("Success! :)")
            }
            else {
                // Show failure with db error
                console.log("Failure! :(")
            }
            res.end('uname:' + username + ' psw:' + password)
          })
    }
    else { //Just default to login page
        console.log("Undefined request .");
    }
}).listen(8080);