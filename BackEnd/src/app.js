const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));

// Serve static files from the 'public' directory
app.use('/public', express.static(path.join(__dirname, '../public')));

app.use(cors());

// Now import routes
const router = require("../src/Routes/route");

app.use("/api", router);

module.exports = app;