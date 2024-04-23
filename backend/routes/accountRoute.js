const express = require("express");
const accountRouter = express.Router();
const auth = require("../middlewares/auth");
const {
  getBalance,
  balanceTransfer,
} = require("../controllers/accountController");

accountRouter.get("/balance", auth, getBalance);
accountRouter.post("/transfer", auth, balanceTransfer);

module.exports = accountRouter;
