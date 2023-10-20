const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1qp2qmz.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Middleware
app.use(cors())
app.use(express.json())

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const cars = client.db("carDB").collection("cars");

        app.get('/bmw', async (req, res) => {
            const result = await cars.find({ "brandName": "BMW" }).toArray();
            res.send(result)
        })
        app.get('/ford', async (req, res) => {
            const result = await cars.find({ "brandName": "Ford" }).toArray();
            res.send(result)
        })
        app.get('/toyota', async (req, res) => {
            const result = await cars.find({ "brandName": "Toyota" }).toArray();
            res.send(result)
        })
        app.get('/tesla', async (req, res) => {
            const result = await cars.find({ "brandName": "Tesla" }).toArray();
            res.send(result)
        })
        app.get('/mercedes-benz', async (req, res) => {
            const result = await cars.find({ "brandName": "Mercedes-Benz" }).toArray();
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})