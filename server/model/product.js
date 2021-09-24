const mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
  pname: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  date: { type: String, required: true },
  sale: { type: Number, required: true },
});

const Productdb = mongoose.model("products", productSchema);

module.exports = Productdb;
