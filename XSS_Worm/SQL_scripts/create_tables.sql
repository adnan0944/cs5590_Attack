DROP TABLE Users;
--DROP TABLE Friends; 

CREATE TABLE Users (userID INTEGER PRIMARY KEY AUTOINCREMENT, fullname TEXT, username TEXT, password TEXT, pfp TEXT, occupation TEXT, association TEXT, friends INTEGER);
PRAGMA table_info(Users);

--CREATE TABLE Friends (friendID INTEGER PRIMARY KEY AUTOINCREMENT, userA INTEGER, userB INTEGER);
