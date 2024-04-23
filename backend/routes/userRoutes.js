const express = require("express");
const {
  userSignUp,
  userLogin,
  updateUser,
  findUsers,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");
const userRoute = express.Router();

userRoute.post("/login", userLogin);
userRoute.post("/signup", userSignUp);
userRoute.get("/bulk", auth, findUsers);
userRoute.patch("/update", auth, updateUser);

module.exports = userRoute;
