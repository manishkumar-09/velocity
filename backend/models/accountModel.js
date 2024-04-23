const { Schema, model } = require("mongoose");
const accountSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
  },
  { timeseries: true }
);

const Account = model("Account", accountSchema);

module.exports = Account;