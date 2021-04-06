const mongoose = require("mongoose");

const userReqSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    validate(value) {},
  },
  number: {
    type: String,
  },
  company: {
    type: String,
  },
  date: {
    type: String,
  },
});

const userModel = mongoose.model("User", userReqSchema);

module.exports = userModel;
