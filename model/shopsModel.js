const mongoose = require("mongoose");

const shopsSchema = new mongoose.Schema({
  photo: {
    type: String,
    default: "default.jpeg",
  },
  shopName: {
    type: String,
    required: [true, "Required"],
    unique: [true, "This shop name already exsist"],
  },
  url: {
    type: String,
  },
  description: {
    type: String,
    required: [true, "Required"],
  },
  number: {
    type: String,
    required: [true, "Required"],
  },
  location: {
    type: String,
    required: [true, "Required"],
  },
});

const shopModel = mongoose.model("Shop", shopsSchema);

module.exports = shopModel;
