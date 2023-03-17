const express = require("express");
const router = new express.Router();
const auth = require("../middlewares/auth");
const Admin = require("../models/admin");
const MailingList = require("../models/mailing-list");

router.post("/emails/sign-up", async (req, res) => {
  const email = req.email;
  try {
    await email.save();
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});
