const express = require("express");
const router = express.Router();
const controller = require("../controller/bookController")

let routes = (app) => {
    router.get("/getall", controller.getAllBooks);
    router.post("/add", controller.addBook);
    router.put("/update", controller.updateBook);

    app.use("/book", router);
};

module.exports = routes;