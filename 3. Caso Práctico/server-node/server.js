const express = require('express')
const cors = require('cors')
const app = express()
const apiPort = 3000
const userRoutes = require("./router/routerUser")
const bookRoutes = require("./router/routerBook")
const bookRequestRoutes = require("./router/routerBookRequest")
const db = require("./database"); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get('/', (req, res) => {
    res.json({data:"HELLO WORLD", success:true});
});

userRoutes(app);
bookRoutes(app);
bookRequestRoutes(app);

module.exports = app.listen(apiPort,()=>{console.log(`Server is running at port ${apiPort}`)});