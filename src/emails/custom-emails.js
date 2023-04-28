require("dotenv").config();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendCustomEmail = (email, subject, message, attachments) => {
  sgMail.send({
    to: email,
    from: process.env.SENDER_EMAIL,
    subject: subject,
    text: message,
    attachments: attachments,
  });
};

module.exports = {
  sendCustomEmail,
};
