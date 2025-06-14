const express = require("express");
const cors = require("cors");
require("dotenv").config();
const admin = require("firebase-admin");
const serviceAccount = require("./firebaseAdminKey.json");

const port = process.env.PORT || 3000;
const app = express();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// ?Middlewares
app.use(cors());
app.use(express.json());

const verifyToken = (req, res, next) => {
    const token = req.headers?.authorization;
    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).send({ message: "Unauthorized Access Denied" });
    }
    const accessToken = token.split(" ")[1];
    admin
        .auth()
        .verifyIdToken(accessToken)
        .then((decoded) => {
            req.decoded = decoded;
            next();
        })
        .catch((err) => {
            res.status(403).send({ message: "Forbidden Access", error: err });
        });
};

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
        // ?Upcoming Events GET API
        app.get("/events/upcoming", async (req, res) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0); //* strips all the time related values
            const query = {
                eventDate: { $gte: today },
            };
            const dateSort = { eventDate: 1 };
            const projection = {
                participants: 0, //? exclude the participants field
            };
            const result = await eventColl
                .find(query, { projection })
                .sort(dateSort)
                .toArray();
            res.send(result);
        });

        // ?Joined Events GET API
        app.get("/events/joined", verifyToken, async (req, res) => {
            const userEmail = req.query.email;
            const tokenEmail = req?.decoded?.email;
            if (userEmail !== tokenEmail) {
                return res.status(403).send({ message: "Forbidden Access" });
            }
            const query = {
                "participants.email": userEmail,
            };
            const projection = {
                participants: 0, //? exclude the participants field
            };
            const result = await eventColl
                .find(query, { projection })
                .toArray();
            res.send(result);
        });

        // ? Create Events POST API
        app.post("/event/create", verifyToken, async (req, res) => {
            const doc = req.body;
            // ?Converting string date into ISO format
            const eventDate = doc.eventDate; //* initial value of eventDate
            const [day, month, year] = eventDate.split("/").map(Number); //* converting formDate to number
            const date = new Date(year, month - 1, day); //* converting formDate into js date obj
            doc.eventDate = date;
            const result = await eventColl.insertOne(doc);
            res.send({ message: "data added successfully", result: result });
        });
    } finally {
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log("kindlevent server running on port", port);
});
