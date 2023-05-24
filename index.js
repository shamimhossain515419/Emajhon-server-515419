// Importing required modules
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
// Creating an instance of the Express application
const port = process.env.PORT || 5000
const app = express();
require('dotenv').config();
app.use(cors())
app.use(express.json());


// EmajhonDB
// Producat


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

  // Connect the client to the server	(optional starting in v4.7)
  // await client.connect();
  // Send a ping to confirm a successful connection

  const ProductCollacion = client.db("EmajhonDB").collection("Producat");
  // const indexKey = { name: 1 };
  //   const indexOptions = { name: "name", };
  //   const result = await ProductCollacion.createIndex(indexKey, indexOptions)
    
  
  app.get('/product', async (req, res) => {
  const search = req.query.search;
    console.log(search);
    const query =  {"name": {$regex: search, $options: 'i'}}
    const result = await ProductCollacion.find(query).toArray();
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
