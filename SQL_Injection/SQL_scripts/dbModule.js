//https://codeburst.io/node-js-mysql-and-promises-4c3be599909b

const sqlite3 = require('sqlite3').verbose();
const db_name = './example.sqlite'

class SQLDatabase {
  constructor() {
      this.connection = new sqlite3.Database(db_name, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the ' +db_name+ ' database.');
      });
  }
  query( sql ) {
      return new Promise( ( resolve, reject ) => {
          this.connection.all( sql, [], ( err, rows ) => {
              if ( err )
                  return reject( err );
              resolve( rows );
          } );
      } );
  }
  close() {
      return new Promise( ( resolve, reject ) => {
          this.connection.end( err => {
              if ( err )
                  return reject( err );
              resolve();
          } );
          console.log('Close the database connection.');
      } );
  }
}

module.exports.sqlDB = new SQLDatabase();