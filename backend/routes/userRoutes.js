const express = require("express");
const {
  userSignUp,
  userLogin,
  updateUser,
} = require("../controllers/userController");
const { auth } = require("../middlewares/auth");
const userRoute = express.Router();

userRoute.post("/signup", userSignUp);
userRoute.post("/login", userLogin);
userRoute.patch("/update", auth, updateUser);

module.exports = userRoute;
