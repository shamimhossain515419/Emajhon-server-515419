// Importing required modules
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
// Creating an instance of the Express application
const port = 5000
const app = express();
require('dotenv').config();
app.use(cors())
app.use(express.json());


const uri = "mongodb+srv://emajhon515419:qdUOf0k4YwwVRhAO@cluster0.jt15atw.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {


  const ProductCollacion = client.db("EmajhonDB").collection("Producat");

  app.get('/product', async (req, res) => {
  const result = await ProductCollacion.find().toArray();
    res.send(result)

  })

  app.get('/product/:text', async (req, res) => {

    const text = req.params.text;

    const query = { category: text }
    const result = await ProductCollacion.find(query).toArray();
    res.send(result)

  });

  // await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");

}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello, world!');
});


// Start the server

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
