require("dotenv").config();
require("./configs/db");
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const router = require("./routes");

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(PORT, () => {
  console.log(`Sever is listening at ${PORT}`);
});
