const sqlite3 = require('sqlite3')
const datetimeFuncs= require('../components/datetime')
const db = new sqlite3.Database('./database/database.db', (err) => {
    if (err) {
        console.error("Erro opening database " + err.message);
    } else {

        db.run('CREATE TABLE users( \
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            first_name NVARCHAR(100)  NOT NULL,\
            last_name NVARCHAR(100)  NOT NULL,\
            email NVARCHAR(100),\
            password NVARCHAR(100),\
            phone NVARCHAR(100),\
            profile_id smallint,\
            CREATEDATE NVARCHAR(100),\
            UPDATEDATE NVARCHAR(100)\
        )', (err) => {
            if (err) {
                console.log("Table 'users' already exists.");
                return;
            }
            let insert = 'INSERT INTO users (first_name, last_name, email, password, phone, profile_id, CREATEDATE, UPDATEDATE) VALUES (?,?,?,?,?,?,?,?)';
            let today=datetimeFuncs.getToday();
            db.run(insert, ["Admin", "Intelligential", "admin@gmail.com", "123", "3121063756", 1, 
                today,
                today]);
            db.run(insert, ["Bibliotecario", "Intelligential", "bibliotecario@gmail.com", "456", "3121063756", 2, 
                today,
                today]);
            db.run(insert, ["Lector", "Intelligential", "lector@gmail.com", "234", "3121063756", 3, 
                today,
                today]);
        });

        db.run('CREATE TABLE books( \
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            title NVARCHAR(100)  NOT NULL,\
            author NVARCHAR(100)  NOT NULL,\
            editorial NVARCHAR(100),\
            year smallint,\
            pages smallint,\
            CREATEDATE NVARCHAR(100),\
            UPDATEDATE NVARCHAR(100)\
        )', (err) => {
            if (err) {
                console.log("Table 'books' already exists.");
                return;
            }
            let insert = 'INSERT INTO books (title, author, editorial, year, pages, CREATEDATE, UPDATEDATE) VALUES (?,?,?,?,?,?,?)';
            let today=datetimeFuncs.getToday();
            db.run(insert, ["Los milagros prohibidos", "Alexis Ravelo", "Siruela", 1990, 350, 
                today,
                today]);
        });

        db.run('CREATE TABLE books_requests( \
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            id_book INTEGER  NOT NULL,\
            id_user_request INTEGER  NOT NULL,\
            REQUESTDATE NVARCHAR(100) NOT NULL,\
            BORROWDATE NVARCHAR(100) NULL,\
            DENEGATEDDATE NVARCHAR(100) NULL,\
            DELIVERYDATE NVARCHAR(100) NULL,\
            id_user_update INTEGER NULL, \
            CREATEDATE NVARCHAR(100),\
            UPDATEDATE NVARCHAR(100)\
        )', (err) => {
            if (err) {
                console.log("Table 'books_requests' already exists.");
            }
        });
    }
});

module.exports=
{
    db:db
};