var express = require('express');
var router = express.Router();
var path = require('path');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

var dt = require(__dirname +'/../SQL_scripts/dbModule.js');

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/login.html'));
});

router.post('/', function(req, res, next) {
  loginCreds = JSON.parse(JSON.stringify(req.body))
  username = loginCreds["username"]
  password = loginCreds["password"]
  var sqlQuery = `SELECT * FROM Users WHERE username='`+username+`' AND password='`+password+`'`
  dt.sqlDB.query(sqlQuery).then( rows => {
    console.log(rows)
    if (rows != undefined && rows.length == 1) {
      // Show page
      console.log("Success! :)")
      req.params.name = username
      res.redirect('/profile/'+username)
    }
    else {
      // Show failure with db error
      console.log("Failure Login! :(")
      res.redirect('/')
    }
  });
});

router.get('/profile/:username', function(req, res){
  //var exploit = "<form action=\"/action_page.php\"><button "
  //<script>window.location.href='/addfriend'</script>
  console.log("_______________________")
  console.log(req.params.username)
  console.log("_______________________")

  var sqlQuery = `SELECT * FROM Users WHERE username='`+req.params.username+`'`
  var thisUser = null
  dt.sqlDB.query(sqlQuery).then( rows => {
    console.log(rows)
    if (rows != undefined && rows.length == 1) {
      // Show page
      thisUser = {user: {
        username: rows[0].username, 
        name: rows[0].fullname, 
        pfp: '../'+rows[0].pfp, 
        occupation: rows[0].occupation, 
        association: rows[0].association}
    };
    console.log(thisUser)
    res.render('dynamic', thisUser);
  } 
    else {
      // Show failure with db error
      console.log("Failure Members! :(")
      res.redirect('/')
    }
  });
});

router.post('/:username/addFriend', function(req, res){
  profileChanges = JSON.parse(JSON.stringify(req.body))
  friend = profileChanges["user"]
  console.log("Adding Friend " + friend)
  console.log(req.params.username)
  res.redirect('/profile/'+req.params.username)
});

router.get('/members', function(req, res){
  console.log("Viewing Members")
  var users = {user1: { 
    name: 'Samy', 
    pfp: '../images/samy_pfp.jpg', 
    link: 'elite'
    },
    user2: { 
      name: 'John', 
      pfp: '../images/john_doe_pfp.jpg', 
      link: 'average'
    },
    user3: { 
      name: 'Alice', 
      pfp: '../images/alice_pfp.png', 
      link: 'queen'
    }
  }
  res.render('layout', users);
});

// Assumes Only Samy will edit
// Can create a view for general using pug
router.get('/:username/edit', function(req, res, next) {
  // res.sendFile(path.join(__dirname + '/edit_profile.html'));
  var sqlQuery = `SELECT * FROM Users WHERE username='`+req.params.username+`'`
  var thisUser = null
  dt.sqlDB.query(sqlQuery).then( rows => {
    console.log(rows)
    if (rows != undefined && rows.length == 1) {
      // Show page
      thisUser = {user: {
        username: rows[0].username, 
        name: rows[0].fullname, 
        pfp: '../'+rows[0].pfp, 
        occupation: rows[0].occupation, 
        association: rows[0].association}
    };
    console.log(thisUser)
    res.render('edit', thisUser);
  } 
    else {
      // Show failure with db error
      console.log("Failure Edit! :(")
      res.redirect('/')
    }
  });
});


router.post('/edit', function(req, res, next) {
  profileChanges = JSON.parse(JSON.stringify(req.body))
  thisUsername = profileChanges["user"]
  thisFullname = profileChanges["fullname"]
  thisOccupation = profileChanges["occupation"]
  thisAssociation = profileChanges["association"]

  
  var sqlQuery = `UPDATE Users SET fullname ='` +thisFullname+`', occupation = '`+thisOccupation+`', association = '`+thisAssociation+`' WHERE username = '`+thisUsername+`'`;
  console.log(sqlQuery)
  dt.sqlDB.query(sqlQuery).then( rows => {
    console.log(rows)
    res.redirect('/profile/'+thisUsername);
  });
});

module.exports = router;

// Get updated information from Samy that contains worm code
// Add friend
// Alice visits Samy's Page
// Samy is now Alice's Friend
