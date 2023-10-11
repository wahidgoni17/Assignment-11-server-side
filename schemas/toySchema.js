const mongoose = require("mongoose");

const toySchema = mongoose.Schema({
  email: String,
  sellerName: String,
  toyName: String,
  toyPhoto: String,
  subCategory: String,
  price: String,
  quantity: String,
  ratings: String,
  details: String,
});

const Toy = new mongoose.model("Toy", toySchema)
module.exports = Toy