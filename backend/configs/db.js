const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error", err);
});
mongoose.connection.on("connected", (err, res) => {
  console.log("Mongoose is connected");
});
