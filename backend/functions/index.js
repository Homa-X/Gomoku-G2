const app = require('./server.js')
require('dotenv').config();

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`http server listening on port ${PORT}`);
})

import functions from "firebase-functions";

// Import express
import express from "express";
const app = express();

import {exampleRouter} from "./example.js";
app.use("/example", exampleRouter);

export const gomoku = functions.https.onRequest(app);