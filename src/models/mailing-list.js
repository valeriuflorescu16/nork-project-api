const mongoose = require("mongoose");
const validator = require("validator");

const mailingListSchema = new mongoose.Schema({
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

const MailingList = mongoose.model("MailingList", mailingListSchema);

module.exports = MailingList;
