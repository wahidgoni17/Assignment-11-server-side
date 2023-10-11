const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const Toy = require("./schemas/toySchema");
const Gallery = require("./schemas/gallerySchema");
// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.meta || 4000;
// dotenv
require("dotenv").config();
// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@wahiddatabase1.1tmbx62.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    dbName: "toyhub",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connetion successfull"))
  .catch((err) => console.log(err));

// gallery section
app.get("/gallery", async (req, res) => {
  try {
    const result = await Gallery.find();
    console.log("gallery found succesfully");
    res.send(result);
  } catch (error) {
    console.log("there was a server side error");
  }
});

// get all toys section
app.get("/toys", async (req, res) => {
  try {
    let query = {};
    if (req.query?.email) {
      query = { email: req.query.email };
    }
    const result = await Toy.find(query);
    res.send(result);
    console.log("toys found succesfully");
  } catch (error) {
    console.log("there was a server side error");
  }
});

// get a toy by id
app.get("/toys/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: id };
    const result = await Toy.findOne(query);
    res.send(result);
  } catch (error) {
    console.log("there was a server side error", error);
  }
});

// Post a toy
app.post("/toys", async (req, res) => {
  try {
    const toyData = new Toy(req.body);
    await toyData.save();
    res.status(200).json("toy posted succesfully");
    console.log("toy posted succesfully");
  } catch (error) {
    console.log("there was a server side error", error);
  }
});

// Update a Toy by id
app.put("/toys/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: id };
    const options = { new: true };
    const updatedInfo = req.body;
    const toyUpdate = {
      $set: {
        toyName: updatedInfo.toyName,
        subCatagory: updatedInfo.subCatagory,
        price: updatedInfo.price,
        quantity: updatedInfo.quantity,
        details: updatedInfo.details,
      },
    };
    const result = await Toy.findOneAndUpdate(filter, toyUpdate, options);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json("there is an error waiting for you");
    console.log("there was a server side error", error);
  }
});

// delete a toy by id
app.delete("/toys/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: id };
    const result = await Toy.deleteOne(query);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.get("/", (req, res) => {
  res.send("babies playing with toy here");
});

app.listen(port, () => {
  console.log(`babies playing here ${port}`);
});
