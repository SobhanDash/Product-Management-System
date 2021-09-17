const express = require("express");
const route = express.Router();
const services = require("../services/render");
const controller = require("../controller/controller");
const Userdb = require("../model/model");

/**
 * @description
 * Root Route
 * @method GET/
 */
route.get("/", services.homeRoute);

/**
 * @description
 * Login Route
 * @method GET/
 */
// route.get("/login", services.loginRoute);
route.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userName = await Userdb.findOne({ email: email });

    if (userName.confirmPassword === password) {
      res.status(202).render("dashboard");
    } else {
      res.render("login");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @description
 * Register Route
 * @method GET/
 */
route.get("/register", services.registerRoute);
route.post("/register", controller.create);
/**
 * @description
 * Dashboard Route
 * @method GET/
 */
route.get("/dashboard", services.dashboardRoute);

//API
// route.post("/users", controller.create);
route.get("/users", controller.find);

module.exports = route;

// api function is the function given after the endpoint.
// flow of a route=> API functionality(GET, POST, PUT, DELETE) -> What to do(handler function) -> Where to do(path/endpoint)
// api is the entire statement. Ex- route.get("/users", controller.find);