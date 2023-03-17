const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URL, {})
  .then(() => {
    console.log("Connected successfully!");
  })
  .catch((err) => {
    console.log("Error connecting: " + err);
  });
