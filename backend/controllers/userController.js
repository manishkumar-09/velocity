const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const {
  signupSchema,
  loginSchema,
  updateSchema,
} = require("../utils/schemaValidation");
const Account = require("../models/accountModel");

module.exports = {
  userSignUp: async (req, res) => {
    try {
      const validateRequest = signupSchema.safeParse(req.body);
      if (!validateRequest.success) {
        return res.status(400).json({
          message: validateRequest.error.errors.map((error) => error.message),
        });
      }
      const { firstName, lastName, password, userName } = req.body;
      const isUserExist = await User.findOne({ userName });
      if (!isUserExist) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = User({
          firstName,
          lastName,
          password: hashPassword,
          userName,
        });
        await user.save();
        const userId = user._id;
        await Account.create({
          userId,
          balance: 1 + Math.random() * 10000,
        });
        res
          .status(201)
          .json({ message: "User signed up successfully", user: user });
      } else {
        res
          .status(409)
          .json({ success: false, message: "User name alredy registered" });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Internal server error ${err.message}`,
      });
    }
  },

  // user login fuction and generation tokek for validation
  userLogin: async (req, res) => {
    try {
      const validateRequest = loginSchema.safeParse(req.body);
      if (!validateRequest.success) {
        return res.status(400).json({
          message: validateRequest.error.errors.map((error) => error.message),
        });
      }
      const { userName, password } = req.body;
      const isUser = await User.findOne({ userName });
      if (isUser !== null) {
        const validatePassword = await bcrypt.compare(
          password,
          isUser.password
        );

        if (validatePassword) {
          const token = jwt.sign(
            { userId: isUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );

          res.status(200).json({ message: "Login success", token: token });
        } else {
          res.status(403).json({
            message: " Incorrect username or password. Please try again",
          });
        }
      } else {
        res.status(400).json({ message: "User not registered " });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Internal server error ${err.message}`,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const validateRequest = updateSchema.safeParse(req.body);
      if (!validateRequest.success) {
        return res.status(400).json({
          message: validateRequest.error.errors.map((error) => error.message),
        });
      }
      const id = req.user;
      if (id) {
        const updatedData = await User.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        res.status(200).json({
          message: "User data updated",
          data: updatedData,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Internal server error ${err.message}`,
      });
    }
  },

  //get user using name substring

  findUsers: async (req, res) => {
    try {
      const filter = req.query.filter || "";

      const users = await User.find({
        $or: [
          {
            firstName: {
              $regex: filter,
            },
          },
          {
            lastName: {
              $regex: filter,
            },
          },
        ],
      });
      res.status(200).json({
        user: users.map((user) => ({
          _id: user._id,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
        })),
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Internal server error ${err}`,
      });
    }
  },
};
