const sqlite3 = require('sqlite3')
const datetimeFuncs= require('../components/datetime');
const { validateEmail } = require('../components/regularExpressions');

//action to get all records
const getAllUsers = (req, res) => {
    const db = new sqlite3.Database('./database/database.db', (err) => {
        if (err) {
            //connection error
            res.status(400).json({"error":err.message});
        } else {
            db.all("SELECT * FROM users ORDER BY ID DESC", [], (err, rows) => {
                if (err) {
                    res.status(500).json({"error":err.message});
                    db.close();
                    return;
                }
                res.status(200).json({numberRecords:rows.length,data:rows});
            });
            db.close();
        }
    });
};

//add user
const addUser = (req, res) => {
    const db = new sqlite3.Database('./database/database.db', (err) => {
        if (err) {
            res.status(400).json({success:false,"error":err.message});
        } else {
            const { 
                first_name, 
                last_name, 
                email, 
                password, 
                confirm_password,
                phone, 
                profile_id } = req.body;

                if(!first_name){
                    res.status(400).json({success:false,"error":"The user first_name field is required."});
                    return;
                }
                if(!last_name){
                    res.status(400).json({success:false,"error":"The user last_name field is required."});
                    return;
                }
                if(!email){
                    res.status(400).json({success:false,"error":"The user email field is required."});
                    return;
                }
                if(!validateEmail(email)){
                    res.status(400).json({success:false,"error":"The email must be in valid format."});
                    return;
                }
                if(!phone){
                    res.status(400).json({success:false,"error":"The user phone field is required."});
                    return;
                }
                if(!profile_id){
                    res.status(400).json({success:false,"error":"The user profile_id field is required."});
                    return;
                }
                if(!password){
                    res.status(400).json({success:false,"error":"The user password field is required."});
                    return;
                }
                if(!confirm_password){
                    res.status(400).json({success:false,"error":"The user confirm_password field is required."});
                    return;
                }

                if(password.trim()!==confirm_password.trim()){
                    db.close();
                    res.status(500).json({success:false, error:"The passwords don't match."});
                    return;
                }

                let insert = 'INSERT INTO users (first_name, last_name, email, \
                    password, phone, profile_id, CREATEDATE, \
                    UPDATEDATE) VALUES (?,?,?,?,?,?,?,?)';
            let today=datetimeFuncs.getToday();
            db.run(insert, 
                [first_name, last_name, email, password, phone, profile_id, today, today], 
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
const updateUser = (req, res) => {
    const db = new sqlite3.Database('./database/database.db', (err) => {
        if (err) {
            res.status(400).json({success:false,error:err.message});
        } else {
            const { 
                first_name, 
                last_name, 
                email, 
                password, 
                confirm_password,
                phone, 
                profile_id,
                id } = req.body;
            if(!id){
                res.status(400).json({success:false,"error":"The user id field is required."});
                return;
            }
            if(!first_name){
                res.status(400).json({success:false,"error":"The user first_name field is required."});
                return;
            }
            if(!last_name){
                res.status(400).json({success:false,"error":"The user last_name field is required."});
                return;
            }
            if(!email){
                res.status(400).json({success:false,"error":"The user email field is required."});
                return;
            }
            if(!validateEmail(email)){
                res.status(400).json({success:false,"error":"The email must be in valid format."});
                return;
            }
            if(!phone){
                res.status(400).json({success:false,"error":"The user phone field is required."});
                return;
            }
            if(!profile_id){
                res.status(400).json({success:false,"error":"The user profile_id field is required."});
                return;
            }
            if(!password){
                res.status(400).json({success:false,"error":"The user password field is required."});
                return;
            }
            if(!confirm_password){
                res.status(400).json({success:false,"error":"The user confirm_password field is required."});
                return;
            }
            

            if(password.trim()!==confirm_password.trim()){
                db.close();
                res.status(500).json({success:false, error:"The passwords don't match."});
                return;
            }
            
            let insert = 'UPDATE users set first_name=?,last_name=?,email=?,\
                            password=?,phone=?,profile_id=?,UPDATEDATE=? \
                            WHERE id=?';
            
            let today=datetimeFuncs.getToday();
            
            db.run(insert, 
                [first_name, last_name, email, password, phone, profile_id, today, id], 
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

//login user
const loginUser = (req, res) => {
    const db = new sqlite3.Database('./database/database.db', (err) => {
        if (err) {
            res.status(400).json({"error":err.message});
        } else {
            const { 
                email, 
                password, 
                } = req.body;
            
                if(!email || !password){
                    res.status(400).json({success:false,error:"The email and password fields are required."});
                    return;
                }
            
            let insert = 'Select * from users where email=?';
            
            db.all(insert, 
                [email], 
                (err, rows)=>{
                    if(err){
                        res.status(500).json({success:false,error:err});
                    }else{
                        if(rows.length==0)
                        {
                            res.status(400).json({success:false,error:"User not found."});
                            return;
                        }
                        insert = 'Select * from users where email=? \
                            and password=?';
                        db.all(insert, 
                            [email, password], 
                            (err, rows)=>{
                                if(err){
                                    res.status(500).json({success:false,error:err});
                                }else{
                                    if(rows.length==0)
                                    {

                                        res.status(400).json({success:false,error:"The given Pasword is wrong."});
                                    }else{
                                        res.status(200).json({success:true,user:rows[0]});
                                    }
                                }
                            });
                    }
            });
            db.close();
        }
    });
};

module.exports={
    getAllUsers,
    addUser,
    updateUser,
    loginUser
};