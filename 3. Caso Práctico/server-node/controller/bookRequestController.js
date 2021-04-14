const sqlite3 = require('sqlite3')
const datetimeFuncs= require('../components/datetime')

const getAllBooksRequests = (req, res) => {
    const db = new sqlite3.Database('./database/database.db', (err) => {
        if (err) {
            //connection error
            res.status(400).json({success:false,error:err.message});
        } else {
            const {  
                id_user } = req.params;
            db.all('SELECT REQ.*,BOK.title,'+
            'USR.first_name,USR.last_name,USR.email,USR.phone '+
            'FROM books_requests REQ '+
            'left join books BOK on REQ.id_book=BOK.id '+
            'left join users USR on REQ.id_user_request=USR.id '+
            (id_user?'WHERE REQ.id_user_request=?':'') +
            ' ORDER BY ID DESC', [id_user], (err, rows) => {
                if (err) {
                    res.status(500).json({success:false,error:err.message});
                    return;
                }
                res.status(200).json({success:true,numberRecords:rows.length, data:rows});
            });
            db.close();
        }
    });
};

//add user
const addBookRequest = (req, res) => {
    const db = new sqlite3.Database('./database/database.db', (err) => {
        if (err) {
            //connection error
            res.status(400).json({success:false,error:err.message});
        } else {
            const { 
                id_book, 
                id_user } = req.body;
                let insert = 'INSERT INTO books_requests (id_book, id_user_request, \
                    REQUESTDATE, \
                    CREATEDATE, \
                    UPDATEDATE \
                    ) VALUES (?,?,?,?,?)';
            let today=datetimeFuncs.getToday();
            db.run(insert, 
                [id_book, id_user, today, today, today], 
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
const updateBookRequest = (req, res) => {
    const db = new sqlite3.Database('./database/database.db', (err) => {
        if (err) {
            //connection error
            res.status(400).json({succedd:false,error:err.message});
        } else {
            const { 
                id, 
                id_user_update,
                BORROWDATE,
                DENEGATEDDATE,
                DELIVERYDATE
            } = req.body;
            
            let insert = 'UPDATE books_requests set BORROWDATE=?,DENEGATEDDATE=?,\
                            DELIVERYDATE=?,UPDATEDATE=?,id_user_update=? \
                            WHERE id=?';
            let today=datetimeFuncs.getToday();
            
            db.run(insert, 
                [BORROWDATE, DENEGATEDDATE, DELIVERYDATE, id_user_update, today, id], 
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
    getAllBooksRequests,
    addBookRequest,
    updateBookRequest
};