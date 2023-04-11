const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  username: { type: String },
  password: { type: String },
  friends: [{ type: Schema.Types.Object, ref: "User" }],
  account: {
    type: String,
    enum: ["student", "instructor"],
  },
});

module.exports = mongoose.model("User", userSchema);
