const { User } = require("../models");
const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
      token: user.token,
    });
  } catch (err) {
    res.status(401).json({ errors: [err.message.split(",")] });
  }
};
const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.signup(name, email, password);
    if (user) {
      res.json({
        _id: user._id,
        email: user.email,
        name: user.name,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt,
        token: user.token,
      });
    }
  } catch (err) {
    res.status(401).json({ errors: [err.message.split(",")] });
  }
};
const getUserInfo = async (req, res) => {
  let { id } = req.params;
  try {
    const user = await User.findById(id).select("-password ");
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    });
  } catch (err) {
    res.status(401).json({ errors: [err.message.split(",")] });
  }
};
const updateUserProfile = async (req, res) => {
  let { id } = req.params;
  let { name } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
      },
      { new: true }
    ).select("-password ");
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    });
  } catch (err) {
    res.status(401).json({ errors: [err.message.split(",")] });
  }
};

module.exports = {
  loginController,
  signupController,
  getUserInfo,
  updateUserProfile,
};
