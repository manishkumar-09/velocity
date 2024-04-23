const express = require("express");
const userRoute = require("./userRoutes");
const accountRouter = require("./accountRoute");
const router = express.Router();

router.use("/api/v1", userRoute);
router.use("/api/v1/account", accountRouter);
module.exports = router;
