const express = require("express");
const router = new express.Router();
const auth = require("../middlewares/auth");
const Admin = require("../models/admin");
const MailingList = require("../models/mailing-list");

router.post("/emails/subscribe", async (req, res) => {
  const email = req.body.email;

  const existingEmail = await MailingList.findOne({ email });

  if (existingEmail)
    return res.status(400).send("Email is already in our mailing list");

  const newEmail = new MailingList({ email });

  try {
    await newEmail.save();
    res.status(201).send({ newEmail });
  } catch (error) {
    res.status(500).send("Error when trying to subscribe to our mailing list");
  }
});

router.delete("/emails/unsubscribe", async (req, res) => {
  const email = req.body.email;

  try {
    await MailingList.findOneAndDelete({ email });
    res
      .status(200)
      .send(`Successfully unsubscribed ${email} from our mailing list`);
  } catch (error) {
    res
      .status(500)
      .send("Error when trying to unsubscribe from our mailing list");
  }
});

router.get("/emails", async (res) => {
  try {
    const emails = (await MailingList.find()).map((email) => email.email);
    res.status(200).send(emails);
  } catch (error) {
    res.status(500).send("Error retrieving emails from the mailing list");
  }
});

module.exports = router;
