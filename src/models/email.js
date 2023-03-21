const mongoose = require("mongoose");
const validator = require("validator");

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
});

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
