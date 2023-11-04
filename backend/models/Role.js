const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  value: {
    type: String,
    default: "USER"
  },
});

module.exports = model("role", roleSchema);
