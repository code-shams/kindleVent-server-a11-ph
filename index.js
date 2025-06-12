const express = require("express");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to KindleVent....");
});

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

const eventColl = client.db("kindleVent-DB").collection("events");

async function run() {
    try {
        // ?GET API
        app.get("/events/all", async (req, res) => {
            const result = await eventColl.find().toArray();
            res.send(result);
        });

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log(
        //     "Pinged your deployment. You successfully connected to MongoDB!"
        // );
    } finally {
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log("kindlevent server running on port", port);
});
