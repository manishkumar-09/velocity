const Account = require("../models/accountModel");
const mongoose = require("mongoose");

module.exports = {
  getBalance: async (req, res) => {
    try {
      const account = await Account.findOne({ userId: req.user });
      res.status(200).json({
        balance: account.balance,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Internal server error ${err.message}`,
      });
    }
  },

  // transfer money to other person

  balanceTransfer: async (req, res) => {
    //creating session using mongoose
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    //find the user associated with account and .session(session) method ensures that the query is executed within the context of the ongoing MongoDB session
    const account = await Account.findOne({ userId: req.user }).session(
      session
    );
    console.log(account);
    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account",
      });
    }

    // transfer the amount to the receiver account

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

    // commit the transaction
    await session.commitTransaction();
    res.status(200).json({
      message: "Transfer Successfull",
    });
  },
  //
};
