const express = require("express");
const {
  sendWelcomeEmail,
  sendCancellationEmail,
} = require("../emails/fixed-emails");
const { sendCustomEmail } = require("../emails/custom-emails");
const router = new express.Router();
const Email = require("../models/email");
const auth = require("../middlewares/auth");

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
    const deletedEmail = await Email.findOneAndDelete({ email });
    if (deletedEmail === null)
      throw new Error("Email not in our mailing list.");
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

router.post("/emails/custom", auth, async (req, res) => {
  const emails = (await Email.find()).map((email) => email.email);
  const attachments = req.body.attachments;
  const subject = req.body.subject;
  const message = req.body.message;

  try {
    sendCustomEmail(emails, subject, message, attachments);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    res.status(500).send("Error sending custom email: " + error);
  }
});

module.exports = router;
