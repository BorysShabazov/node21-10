const { black } = require("colors");
const { Schema, model } = require("mongoose");

const carSchema = new Schema({
  title: { type: String, required: [true, "My message: title is required"] },
  color: { type: String, default: "black" },
  price: { type: Number, required: [true, "My message: price is required"] },
  year: { type: Number, default: 2012 },
});

module.exports = model("car", carSchema);
