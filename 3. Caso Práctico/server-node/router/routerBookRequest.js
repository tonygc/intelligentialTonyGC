const express = require("express");
const router = express.Router();
const controller = require("../controller/bookRequestController")

let routes = (app) => {
    router.get("/getall/:id_user", controller.getAllBooksRequests);
    router.get("/getall", controller.getAllBooksRequests);
    router.post("/add", controller.addBookRequest);
    router.put("/update", controller.updateBookRequest);

  app.use("/bookRequest", router);
};

module.exports = routes;