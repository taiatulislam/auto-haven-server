const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const cart = client.db("carDB").collection("cart");

        // Get all data
        app.get('/', async (req, res) => {
            const result = await cars.find().toArray();
            res.send(result)
        })
        // Get data for each card
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



        // Get by id
        app.get('/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await cars.findOne(query);
            res.send(result)
        })

        // Add Car
        app.post('/cart', async (req, res) => {
            const addCar = req.body;
            const result = await cars.insertOne(addCar);
            res.send(result)
        })

        // Update Car
        app.put('/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const option = { upsert: true }
            const updateCar = req.body;

            const car = {
                $set: {
                    name: updateCar.name,
                    brandName: updateCar.brandName,
                    category: updateCar.category,
                    image: updateCar.image,
                    price: updateCar.price,
                    rating: updateCar.rating,
                    details: updateCar.details
                }
            }
            const result = await cars.updateOne(filter, car, option);
            res.send(result)
        })


        // Get Cart
        app.get('/cart/:email', async (req, res) => {
            const email = req.params.email;
            console.log(email);
            const query = { email: new ObjectId(email) }
            const result = await cart.find(query).toArray();
            res.send(result)
        })

        // Add cart
        app.post('/cart', async (req, res) => {
            const addCart = req.body;
            const result = await cart.insertOne(addCart);
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