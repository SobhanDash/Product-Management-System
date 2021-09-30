const Productdb = require("../model/product");

exports.homeRoute = (req, res) => {
  res.render("index");
};

exports.loginRoute = (req, res) => {
  res.render("login");
};

exports.registerRoute = (req, res) => {
  res.render("register");
};

exports.dashboardRoute = (req, res) => {
  // make a get request to api/product
  Productdb.find()
    .then((product) => {
      res.render("dashboard", { products: product });
    })
    .catch((err) => {
      res.status(500).send("Error occured");
    });
};

exports.addProductsRoute = (req, res) => {
  res.render("addproducts");
};

exports.updateProductRoute = (req, res) => {
  Productdb.find({ _id: req.query.id })
    .then((product) => {
      console.log(product[0]);
      res.render("update_product", { products: product[0] });
    })
    .catch((err) => {
      res.status(500).send("Error occured", err);
    });
};
