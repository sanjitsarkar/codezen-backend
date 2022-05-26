const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [5, "Minimum length should be 5"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      minlength: [10, "Minimum length should be 10"],
      validate: (value) => isEmail(value),
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Minimum length should be 6"],
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.index({ name: "text", email: "text" }, { sparse: true });
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      const token = jwt.sign(
        { id: user._id, email },
        process.env.JWT_TOKEN_KEY
      );
      user.token = token;
      user.password = undefined;
      return user;
    } else {
      throw Error("Wrong password");
    }
  } else {
    throw Error("Incorrect email");
  }
};
userSchema.statics.signup = async function (name, email, password) {
  const isuserExist = await this.findOne({ email });
  if (isuserExist) {
    throw Error("User already exist. Please login");
  }

  const user = await this.create({
    name,
    email: email.toLowerCase(),
    password,
  });
  user.password = undefined;

  const token = jwt.sign(
    { id: user._id, email: email.toLowerCase() },
    process.env.JWT_TOKEN_KEY
  );
  user.token = token;
  return user;
};

const User = model("user", userSchema);

module.exports = User;
