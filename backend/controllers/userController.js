const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { signupSchema, loginSchema } = require("../utils/schemaValidation");

module.exports = {
  userSignUp: async (req, res) => {
    try {
      const validateRequest = signupSchema.safeParse(req.body);
      if (!validateRequest.success) {
        return res.status(400).json({ message: validateRequest.error });
      }
      const { firstName, lastName, password, userName } = req.body;
      const isUserExist = await User.findOne({ userName });
      if (!isUserExist) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = {
          firstName,
          lastName,
          password: hashPassword,
          userName,
        };
        await user.save();
        res.status(201).json({ message: "User signed up successfully" });
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

  userLogin: async (req, res) => {
    try {
      const validateRequest = loginSchema.safeParse(req.body);
      if (!validateRequest.success) {
        return res.status(400).json({ message: validateRequest.error });
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
          res.status(403).json({ message: "Wrong Credentials" });
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
      const validateRequest = loginSchema.safeParse(req.body);
      if (!validateRequest.success) {
        return res.status(400).json({ message: validateRequest.error });
      }
      const id = req.user._id;
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
};
