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

  // if(username == "elite" && password == "hacker") {
  //   res.redirect('/samy');
  // }

  // if(username == "average" && password == "guy") {
  //   res.redirect('/john');
  // }

  // if(username == "queen" && password == "hearts") {
  //   res.redirect('/alice');
  // }
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
        username: username, 
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

// router.get('/john', function(req, res){
//   var thisUser = {user: { name: "John", pfp: "./images/john_doe_pfp.jpg", occupation: "Graduate Student, Researcher", association: "Virginia Tech"}}
//   res.render('dynamic', thisUser);
// });

// router.get('/alice', function(req, res){
//   var thisUser = {user: { name: "Alice", pfp: "./images/alice_pfp.png", occupation: "Hiker", association: "Wonderland"}}
//   res.render('dynamic', thisUser);
// });

router.post('/:username/addFriend', function(req, res){
  profileChanges = JSON.parse(JSON.stringify(req.body))
  friend = profileChanges["user"]
  console.log("Adding Friend " + friend)
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
  res.render('dynamic', thisUser);
});


router.post('/:username/edit', function(req, res, next) {
  profileChanges = JSON.parse(JSON.stringify(req.body))
  thisFullname = profileChanges["fullname"]
  thisOccupation = profileChanges["occupation"]
  thisAssociation = profileChanges["association"]

  console.log(association)

  var sqlQuery = `SELECT * FROM Users WHERE username='`+req.params.username+`'`
  var thisUser = null
  dt.sqlDB.query(sqlQuery).then( rows => {
    console.log(rows)
    if (rows != undefined && rows.length == 1) {
      // Show page
      thisUser = {user: {
        username: username, 
        name: thisFullname, 
        pfp: '../'+rows[0].pfp, 
        occupation: thisOccupation, 
        association: thisAssociation}
    };
    console.log(thisUser)
    res.redirect('/profile'+username);
  } 
    else {
      // Show failure with db error
      console.log("Failure Edit! :(")
      res.redirect('/')
    }
  });
});

module.exports = router;

// Get updated information from Samy that contains worm code
// Add friend
// Alice visits Samy's Page
// Samy is now Alice's Friend
