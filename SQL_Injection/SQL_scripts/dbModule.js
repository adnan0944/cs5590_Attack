//https://www.sqlitetutorial.net/sqlite-nodejs/

const sqlite3 = require('sqlite3').verbose();
const db_name = './SQL_scripts/example.sqlite'

// open the database
let db = new sqlite3.Database(db_name, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the ' +db_name+ ' database.');
});

// Read in input from user
// TODO Insert the entries
// let sql = `SELECT * FROM Users`;

// db.all(sql, [], (err, rows) => {
//   if (err) {
//     throw err;
//   }
//   rows.forEach((row) => {
//     console.log(row.name);
//   });
// });

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});