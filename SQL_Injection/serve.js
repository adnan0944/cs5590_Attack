// Built-in
var http = require('http');
var fs = require('fs');
var url = require("url");
const express = require('express')
const bodyParser = require('body-parser')

// Custom
// var dt = require('./SQL_scripts/dbModule.js');

// Params
const port = 9000

const app = express();
app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req, res) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    res.send('Hello World!')
})

app.post('/login.html', function (req, res) {
    res.send('Got a POST request')
})

app.get('/login.html', (req, res) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// http.createServer(function (req, res) {
//     // console.log(__filename)
//     if(req.method == "GET") {
//         console.log("received GET request.")
//         fs.readFile('./Pages/login.html', function(err, data) {
//             var pathname = url.parse(req.url).pathname; //TODO Deprecated?
//             res.writeHead(200, {'Content-Type': 'text/html'}, {Location: 'http://net-test-work.com/' + pathname});
//             res.write(data);
//             return res.end();
//         });
//     }
//     else if(req.method == "POST") {
//         console.log("received POST request.");
//         var body = ''
//         req.on('data', function(data) {
//             body += data
//             // console.log('Partial body: ' + body)
//           })
//           req.on('end', function() {
//             // console.log(new Buffer(body, 'ascii').toString('utf-8'))
//             var vals = body.split("&") //[ 'uname=asdf', 'psw=qwerty' ]
//             var username = vals[0].split("=")[1]
//             var password = vals[1].split("=")[1]
//             console.log(username)
//             console.log(password)
//             // var query = `SELECT * FROM Users WHERE username='`+username+`' AND password='`+password+`'`
//             // dt.queryDB()
//             // TODO Get a return value from exported module
//             // queryRes = dt.dbRes
//             // console.log(queryRes)
//             // queryRes.forEach((row) => {
//             //     console.log(row.fullname);
//             //     console.log(row.username);
//             //     console.log(row.password);
//             // });

//             // Query Database
//             if (username == 'asdf' && password == 'qwerty') {
//                 // Show page
//                 console.log("Success! :)")
//                 fs.readFile('./Pages/login_success.html', function(err, data) {
//                     var pathname = url.parse(req.url).pathname;
//                     res.writeHead(200, {'Content-Type': 'text/html'}, {Location: 'http://net-test-work.com/' + pathname});
//                     res.write(data);
//                     return res.end();
//                 });
//                 // res.end('uname:' + username + ' psw:' + password)
//             }
//             else {
//                 // Show failure with db error
//                 console.log("Failure! :(")
                
//                 fs.readFile('./Pages/login_failure.html', function(err, data) {
//                     var pathname = url.parse(req.url).pathname;
//                     res.writeHead(200, {'Content-Type': 'text/html'}, {Location: 'http://net-test-work.com/' + pathname});
//                     res.write(data);
//                     return res.end();
//                 });
//             }
//           })
//     }
//     else { //Just default to login page
//         console.log("Undefined request .");

//         fs.readFile('./Pages/login.html', function(err, data) {
//             res.writeHead(200, {'Content-Type': 'text/html'});
//             res.write(data);
//             return res.end();
//         });
//     }
// }).listen(8080);

// dt.closeDB()
