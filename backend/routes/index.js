const express = require("express");
const userRoute = require("./userRoutes");
const router = express.Router();

router.use("/api/v1", userRoute);

module.exports = router;
