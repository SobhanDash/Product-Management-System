const express = require("express");
const route = express.Router();
const services = require("../services/render");
const Userdb = require("../model/user");
const user = require("../controller/user");
const productController = require("../controller/productController");
const { Router } = require("express");

/**
 * @description
 * Root Route
 * @method GET/
 */
route.get("/", services.homeRoute);

/**
 * @description
 * Login Routes
 * @method GET/
 * @method POST/
 */

route.get("/login", services.loginRoute);
route.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const pass = await Userdb.findOne({ password: password });

    if (pass.confirmPassword === password) {
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
 * Register Routes
 * @method GET/
 * @method POST/
 */
route.get("/register", services.registerRoute);
route.post("/register", user.create);

/**
 * @description
 * Dashboard Route
 * @method GET/
 */
route.get("/dashboard", services.dashboardRoute);

/**
 * @description
 * User Routes
 * @method GET/
 */
route.get("/users", user.find);

/**
 * @description
 * Register Routes
 * @method GET/
 * @method POST/
 */
route.get("/addproduct", services.addProductsRoute);
route.post("/addproduct", productController.addProduct);

//API
// route.get("/api/products", productController.findProduct);
// route.post("/api/products", productController.addProduct);
// route.put("/api/products:id", productController.updateProduct);
// route.delete("/api/products:id", productController.deleteProduct);

module.exports = route;

// api function is the function given after the endpoint.
// flow of a route=> API functionality(GET, POST, PUT, DELETE) -> What to do(handler function) -> Where to do(path/endpoint)
// api is the entire statement. Ex- route.get("/users", user.find);
