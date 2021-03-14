DROP TABLE Users; 
CREATE TABLE Users (userID INTEGER PRIMARY KEY AUTOINCREMENT, fullname TEXT, username TEXT, password TEXT, pfp TEXT, occupation TEXT, association TEXT);
PRAGMA table_info(Users);