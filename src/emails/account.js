require("dotenv").config();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email) => {
  sgMail.send({
    to: email,
    from: process.env.SENDER_EMAIL,
    subject: "Welcome to Nork First",
    text: `placeholder`,
  });
};

const sendCancellationEmail = (email) => {
  sgMail.send({
    to: email,
    from: process.env.SENDER_EMAIL,
    subject: "Sorry to see you go",
    text: "placeholder",
  });
};

const sendCustomEmail = (email, subject, message) => {
  sgMail.send({
    to: email,
    from: process.env.SENDER_EMAIL,
    subject: subject,
    text: message,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
  sendCustomEmail,
};
