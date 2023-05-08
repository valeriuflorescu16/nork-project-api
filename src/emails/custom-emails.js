require("dotenv").config();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendCustomEmail = (emails, subject, message, attachments) => {
  sgMail.send({
    to: emails,
    from: process.env.SENDER_EMAIL,
    subject: subject,
    text: message,
    attachments: attachments,
  });
};

module.exports = {
  sendCustomEmail,
};
