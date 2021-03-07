//https://www.sqlitetutorial.net/sqlite-nodejs/

const sqlite3 = require('sqlite3').verbose();
const db_name = './example.sqlite'
var dbRes = ''
// open the database
let db = new sqlite3.Database(db_name, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the ' +db_name+ ' database.');
});

// Read in input from user
// TODO Callback or promise?
exports.queryDB = function(sqlQuery) {
  console.log(sqlQuery)
  db.all(sqlQuery, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row.fullname);
      console.log(row.username);
      console.log(row.password);
    });
    dbRes = rows

  });
};


exports.closeDB = function() {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
};