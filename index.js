const express = require("express");
const cors = require("cors");
require("dotenv").config;

const port = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to KindleVent....");
});

app.listen(port, () => {
    console.log("kindlevent server running on port", port);
});
