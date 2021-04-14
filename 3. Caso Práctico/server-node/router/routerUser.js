const express = require("express");
const router = express.Router();
const controller = require("../controller/userController")

let routes = (app) => {
    router.get("/getall", controller.getAllUsers);
    router.post("/add", controller.addUser);
    router.post("/login", controller.loginUser);
    router.put("/update", controller.updateUser);

  app.use("/user", router);
};

module.exports = routes;