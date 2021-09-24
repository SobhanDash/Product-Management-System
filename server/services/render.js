const axios = require("axios");

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
  // axios
  //   .get("https://localhost:3000/api/products")
  //   .then(function (res) {
  //     console.log(res);
  //     res.render("dashboard", { products: res.data });
  //   })
  //   .catch((err) => {
  //     res.send(err);
  //   });
  res.render("dashboard");
};

exports.addProductsRoute = (req, res) => {
  res.render("addproducts");
};
