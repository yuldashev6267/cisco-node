const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// Admin Schema
const adminSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: [true, "You should give a admin name"],
    unique: true,
    minLength: [4, "Admin name length should be 4 charcters"],
    maxLength: [12, "Admin name length should be 8 charcters"],
  },
  password: {
    type: String,
    required: [true, "Required"],
  },
  role: {
    type: String,
  },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

adminSchema.methods.passwordChecker = async function (
  candidatePassword,
  password
) {
  return await bcrypt.compare(candidatePassword, password);
};

const adminModel = mongoose.model("Admin", adminSchema);

module.exports = adminModel;
