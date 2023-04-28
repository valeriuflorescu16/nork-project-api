require("dotenv").config();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const welcomeEmail = `Dear Sir/Madam,

Thank you for subscribing to our system.

By signing up to our services, you will now receive email alerts about upcoming developments in the area of Nork.

This provides you with more notice to send objections and avoid missing deadlines.

Together, we can protect our area from the rise of developments which are both detrimental to the environment and our community.

Best regards,
The RADAR Team`;

const cancellationEmail = `Dear Sir/Madam,

You have now successfully unsubscribed from RADAR.

You will no longer receive email updates about upcoming developments in the area of Nork.

If you wish to subscribe again, please click the following link and follow the given instructions: PLACEHOLDER

Best regards,
The RADAR Team`;

const sendWelcomeEmail = (email) => {
  sgMail.send({
    to: email,
    from: process.env.SENDER_EMAIL,
    subject: "Welcome to RADAR!",
    text: welcomeEmail,
  });
};

const sendCancellationEmail = (email) => {
  sgMail.send({
    to: email,
    from: process.env.SENDER_EMAIL,
    subject: "We are sorry to see you go!",
    text: cancellationEmail,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
};
