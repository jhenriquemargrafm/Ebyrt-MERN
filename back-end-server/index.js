const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://userjhmm:7HD23EQTw2ZwvdP@cluster0.49a0f.mongodb.net/mern?retryWrites=true&w=majority"
);

app.listen(3001, () => {
  console.log("The server is running, boy!");
});