const mongoose = require("mongoese");

const routerSchema = new mongoose.Schema({
  photo: {
    type: String,
    default: "default.jpeg",
  },
  description: {
    type: String,
    required: [true, "Required"],
    unique: true,
  },
});
