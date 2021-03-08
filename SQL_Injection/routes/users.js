var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  console.log("users.js")
});

router.post('/', (req, res) => {
  res.send("Bruh")
  console.log("users.js")
})

module.exports = router;
