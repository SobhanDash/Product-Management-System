const Productdb = require("../model/product");

exports.addProduct = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(100).send({ message: "Content cannot be empty!" });
    return;
  }
  //new product
  const product = new Productdb({
    pname: req.body.pname,
    price: req.body.price,
    quantity: req.body.quantity,
    date: req.body.date,
    sale: req.body.sale,
  });

  //save product in database
  product
    .save(product)
    .then((data) => {
      // res.send(data)
      res.redirect("/dashboard");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating new Product",
      });
    });
};

//retreieve and return all products/single product
exports.findProduct = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Productdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "product not found" });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error while retrieving product with id" + id });
      });
  } else {
    Productdb.find()
      .then((product) => {
        res.send(product);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Error occurred while retrieving product information",
        });
      });
  }
};

// Update a new idetified user by user id
exports.updateProduct = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  Productdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update product with ${id}. Maybe product not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update product information" });
    });
};

// Delete a user with specified user id in the request
exports.deleteProduct = (req, res) => {
  const id = req.params.id;

  Productdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "Product was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id,
      });
    });
};
