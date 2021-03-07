# SQL Injection

**Dependencies**
<ul>
    <li>Python 3</li>
    <li>Node.js</li>
    <li>sqlite3</li>
</ul>

**Run Server**<br>
`node serve.js`<br>
Then navigate to `localhost:8080` on browser.

**Create Database**<br>
`python3 sql_connect.py < create_tables.sql`<br>
Will create Users table with autoincrementing ID, fullname, username, and password columns.<br>

`python3 sql_connect.py < insert_entry.sql`<br>
Will create default user 'John Doe' with username 'asdf' and password 'qwerty'. Can edit this file for more users. <br>

Example SQL Injection is stored in `injection.sql`

**Notes**
<ul>
    <li>If `login.html` is not updating, clear browser cache</li>
</ul>