const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares");
const {
  signupController,
  loginController,
  updateUserProfile,
  getUserInfo,
} = require("../controllers/authController");
router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/user", isAuthenticated, getUserInfo);
router.put("/user", isAuthenticated, updateUserProfile);
module.exports = router;
