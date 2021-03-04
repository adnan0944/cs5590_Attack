import sqlite3
from sqlite3 import Error

#https://realpython.com/python-sql-libraries/
def create_connection(path):
    connection = None
    try:
        connection = sqlite3.connect(path)
        print("Connection to SQLite DB successful")
    except Error as e:
        print(f"The error '{e}' occurred")

    return connection

def execute_query(connection, query):
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        connection.commit()
        print("Query executed successfully\n")
    except Error as e:
        print(f"The error '{e}' occurred\n")

def execute_read_query(connection, query):
    cursor = connection.cursor()
    result = None
    try:
        cursor.execute(query)
        result = cursor.fetchall()
        return result
    except Error as e:
        print(f"The error '{e}' occurred")

if __name__ == "__main__":
    connection = create_connection("example.sqlite")
    while 1:
        execute_query(connection, input("Enter SQL Command:\n"))
