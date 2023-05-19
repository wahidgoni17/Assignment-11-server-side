const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.meta || 4000;
// dotenv
require("dotenv").config();
// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@wahiddatabase1.1tmbx62.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const piccollections = client.db("toyhub").collection("gallery");
    const toysCollection = client.db("toyhub").collection("toys");
    // gallery section
    app.get("/gallery", async (req, res) => {
      const cursor = piccollections.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    // add toys section
    app.get("/toys", async (req, res) => {
      let query = {};
      if (req.query?.email) {
        query = { email: req.query.email };
      }
      const cursor = toysCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/toys/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await toysCollection.findOne(query);
      res.send(result);
    });

    app.post("/toys", async (req, res) => {
      const toyData = req.body;
      const result = await toysCollection.insertOne(toyData);
      res.send(result);
    });

    app.put("/toys/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedInfo = req.body
      const toyUpdate = {
        $set: {
          toyName: updatedInfo.toyName,
          subCatagory: updatedInfo.subCatagory,
          price: updatedInfo.price,
          quantity: updatedInfo.quantity,
          details: updatedInfo.details
        }
      }
      const result = await toysCollection.updateOne(filter, toyUpdate, options)
      res.send(result)
    });

    app.delete("/toys/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await toysCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("babies playing with toy here");
});
app.listen(port, () => {
  console.log(`babies playing here ${port}`);
});
