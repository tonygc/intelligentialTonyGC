const sqlite3 = require('sqlite3')
const datetimeFuncs= require('../components/datetime')

//action to get all records
const getAllBooks = (req, res) => {
    const db = new sqlite3.Database('./database/database.db', (err) => {
        if (err) {
            //connection error
            res.status(400).json({"error":err.message});
        } else {
            db.all("SELECT * FROM books ORDER BY ID DESC", [], (err, rows) => {
                if (err) {
                    res.status(500).json({"error":err.message});
                    db.close();
                    return;
                }
                res.status(200).json({numberRecords:rows.length, data:rows});
            });
            db.close();
        }
    });
};

//add user
const addBook = (req, res) => {
    const db = new sqlite3.Database('./database/database.db', (err) => {
        if (err) {
            //connection error
            res.status(400).json({"error":err.message});
        } else {
            const { 
                title, 
                author, 
                editorial, 
                year, 
                pages } = req.body;
                let insert = 'INSERT INTO books (title, author, editorial, \
                    year, pages, CREATEDATE, \
                    UPDATEDATE) VALUES (?,?,?,?,?,?,?)';
            let today=datetimeFuncs.getToday();
            db.run(insert, 
                [title, author, editorial, year, pages, today, today], 
                function(err) {
                    if(err){
                        res.status(500).json({success:false,error:err});
                    }else{
                        res.status(200).json({success:true, inserted_id:this.lastID});
                    }
            });
            db.close();
        }
    });
};

//update user
const updateBook = (req, res) => {
    const db = new sqlite3.Database('./database/database.db', (err) => {
        if (err) {
            //connection error
            res.status(400).json({"error":err.message});
        } else {
            const { 
                id,
                title, 
                author, 
                editorial, 
                year, 
                pages } = req.body;
            
            let insert = 'UPDATE books set title=?,author=?,\
                            editorial=?,year=?,pages=?,UPDATEDATE=? \
                            WHERE id=?';
            let today=datetimeFuncs.getToday();
            
            db.run(insert, 
                [title, author, editorial, year, pages, today, id], 
                (err)=>{
                    if(err){
                        res.status(500).json({success:false,error:err});
                    }else{
                        res.status(200).json({success:true,updated_id:id});
                    }
            });
            db.close();
        }
    });
};

module.exports={
    getAllBooks,
    addBook,
    updateBook
};