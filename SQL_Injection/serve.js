// Built-in
var http = require('http');
var fs = require('fs');
var url = require("url");

// Custom
var dt = require('./SQL_scripts/dbModule.js');

http.createServer(function (req, res) {
    // console.log(__filename)
    if(req.method == "GET") {
        console.log("received GET request.")
        fs.readFile('./Pages/login.html', function(err, data) {
            var pathname = url.parse(req.url).pathname; //TODO Deprecated?
            res.writeHead(200, {'Content-Type': 'text/html'}, {Location: 'http://net-test-work.com/' + pathname});
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

            dt.queryDB(`SELECT * FROM Users`)
            // TODO Get a return value from exported module
            // queryRes = dt.dbRes
            // console.log(queryRes)
            // queryRes.forEach((row) => {
            //     console.log(row.fullname);
            //     console.log(row.username);
            //     console.log(row.password);
            // });

            // Query Database
            if (username == 'asdf' && password == 'qwerty') {
                // Show page
                console.log("Success! :)")
                fs.readFile('./Pages/login_success.html', function(err, data) {
                    var pathname = url.parse(req.url).pathname;
                    res.writeHead(200, {'Content-Type': 'text/html'}, {Location: 'http://net-test-work.com/' + pathname});
                    res.write(data);
                    return res.end();
                });
                // res.end('uname:' + username + ' psw:' + password)
            }
            else {
                // Show failure with db error
                console.log("Failure! :(")
                
                fs.readFile('./Pages/login_failure.html', function(err, data) {
                    var pathname = url.parse(req.url).pathname;
                    res.writeHead(200, {'Content-Type': 'text/html'}, {Location: 'http://net-test-work.com/' + pathname});
                    res.write(data);
                    return res.end();
                });
            }
          })
    }
    else { //Just default to login page
        console.log("Undefined request .");

        fs.readFile('./Pages/login.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    }
}).listen(8080);

// dt.closeDB()
