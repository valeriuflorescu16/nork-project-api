const express = require("express");
const {
  sendWelcomeEmail,
  sendCancellationEmail,
} = require("../emails/account");
const router = new express.Router();
const auth = require("../middlewares/auth");
const Admin = require("../models/admin");
const Email = require("../models/email");

router.post("/emails/subscribe", async (req, res) => {
  const email = req.body.email;

  const existingEmail = await Email.findOne({ email });

  if (existingEmail)
    return res.status(400).send("Email is already in our mailing list");

  const subscriber = new Email({ email });

  try {
    await subscriber.save();
    sendWelcomeEmail(subscriber.email);
    res.status(201).send({ subscriber });
  } catch (error) {
    res
      .status(500)
      .send("Error when trying to subscribe to our mailing list: " + error);
  }
});

router.delete("/emails/unsubscribe", async (req, res) => {
  const email = req.body.email;

  try {
    await Email.findOneAndDelete({ email });
    sendCancellationEmail(email);
    res
      .status(200)
      .send(`Successfully unsubscribed ${email} from our mailing list`);
  } catch (error) {
    res
      .status(500)
      .send("Error when trying to unsubscribe from our mailing list: " + error);
  }
});

router.get("/emails", async (req, res) => {
  try {
    const emails = (await Email.find()).map((email) => email.email);
    res.status(200).send(emails);
  } catch (error) {
    res
      .status(500)
      .send("Error retrieving emails from the mailing list: " + error);
  }
});

module.exports = router;
