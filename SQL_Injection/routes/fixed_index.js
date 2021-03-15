// Built in
var express = require('express');
var router = express.Router();
var path = require('path');

// Custom
var dt = require(__dirname +'/../SQL_scripts/fixed_dbModule.js');

// Parsing Post
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

/* GET home page. */
// 'http://net-test-work.com/'
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.sendFile(path.join(__dirname + '/login.html'));
});

router.post('/', function(req, res, next) {
  loginCreds = JSON.parse(JSON.stringify(req.body))
  username = loginCreds["username"]
  password = loginCreds["password"]

  var sqlQuery = `SELECT * FROM Users WHERE username= ? AND password= ?`
  dt.sqlDB.query(sqlQuery, [username, password]).then( rows => {
    console.log(rows)
    if (rows != undefined && rows.length == 1) {
      // Show page
      console.log("Success! :)")
      res.sendFile(path.join(__dirname + '/login_success.html'));
    }
    else {
      // Show failure with db error
      console.log("Failure! :(")
      res.sendFile(path.join(__dirname + '/login_failure.html'));
    }
  });
});

module.exports = router;
