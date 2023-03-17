const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// no validation required as there will be no endpoint to create admin accounts
// this schema is used to add restrictions to who can use this service to send emails to mailing list
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

adminSchema.methods.toJSON = function () {
  const adminObj = this.toObject();

  delete adminObj.password;
  delete adminObj.tokens;

  return adminObj;
};

adminSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    { _id: this._id.toString(), created: Date.toString() },
    process.env.JWT_SECRET,
    { expiresIn: "60d" }
  );

  this.tokens = this.tokens.concat({ token });
  await this.save();

  return token;
};

adminSchema.statics.findByCredentials = async (email, password) => {
  const admin = await Admin.findOne({ email });

  if (!admin) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return admin;
};

// Hash password before saving it to the database
adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
