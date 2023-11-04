const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, required: [true, "My message: email is required"] },
  password: {
    type: String,
    required: [true, "My message: password is required"],
  },
  name: { type: String, default: "user" },
  token: { type: String, default: null },
});

module.exports = model("user", userSchema);
