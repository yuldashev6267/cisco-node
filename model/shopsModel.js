const mongoose = require("mongoose");

const shopsSchema = new Schema({
  photo: {
    type: String,
    default: "default.jpg",
  },
  shopName: {
    type: String,
    required: [true, "Required"],
    unique: [true, "This shop name already exsist"],
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
