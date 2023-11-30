const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.send({
        success: false,
        message: "Sorry, user already exists!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPwd;

    const newUser = await new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "You're successfully registered!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "Sorry, user doesn't exist!",
      });
    }

    const isValidPwd = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPwd) {
      return res.send({
        success: false,
        message: "Password is wrong!",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret_key, {
      expiresIn: "1d",
    });
    res.send({
      success: true,
      message: "You're now logged in!",
      token: token,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err,
    });
  }
});

router.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).select("-password");
    res.send({
      success: true,
      message: "You're authorized for the protected route!",
      data: user,
    });
  } catch (err) {
    res.send({
      success: false,
      message: "Invalid Token",
    });
  }
});

router.post("/change-password", async (req, res) => {
  try {
    let curPwd = req.body.currentPassword;
    let user = await User.findOne({ email: req.body.email });

    const isValidPwd = await bcrypt.compare(curPwd, user.password);
    if (isValidPwd) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
      user.password = hashedPassword;
      await user.save();
      res.send({
        success: true,
        message: "New password has been successfully updated!",
      });
    } else {
      res.send({
        success: false,
        message: "Something went wrong! Please try later.",
      });
    }
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
