const express = require("express");
const router = new express.Router();
const auth = require("../middlewares/auth");
const Admin = require("../models/admin");
const MailingList = require("../models/mailing-list");

router.post("/emails/sign-up", async (req, res) => {
  const email = req.body.email;

  const existingEmail = await MailingList.findOne({ email });

  if (existingEmail)
    return res.status(400).send("Email is already in our mailing list.");

  const newEmail = new MailingList({ email });

  try {
    await newEmail.save();
    res.status(201).send({ newEmail });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
