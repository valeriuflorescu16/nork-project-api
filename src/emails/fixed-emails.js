require("dotenv").config();

const sgMail = require("@sendgrid/mail");
const radarLink = "http://localhost:3000";
const unsubscribeURL = process.env.UNSUBSCRIBE_URL;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const welcomeEmail = (email) => {
  return `Dear Sir/Madam,

Thank you for subscribing to our system.

By signing up to our services, you will now receive email alerts about upcoming developments in the area of Nork.

This provides you with more notice to send objections and avoid missing deadlines.

Together, we can protect our area from the rise of developments which are both detrimental to the environment and our community.

Best regards,
The RADAR Team

To unsubscribe from our emails, please click the following link: ${unsubscribeURL}/${email}`;
};

const welcomeEmailHTML = (email) => {
  return `<p>Dear Sir/Madam,</p>

<p>Thank you for subscribing to our system.</p>

<p>By signing up to our services, you will now receive email alerts about upcoming developments in the area of Nork.</p>

<p>This provides you with more notice to send objections and avoid missing deadlines.</p>

<p>Together, we can protect our area from the rise of developments which are both detrimental to the environment and our community.</p>

<p>Best regards,<br>The RADAR Team</p>

<p>To unsubscribe from our emails, please click <a href="${unsubscribeURL}/${email}">HERE</a></p>`;
};

const cancellationEmail = `Dear Sir/Madam,

You have now successfully unsubscribed from RADAR.

You will no longer receive email updates about upcoming developments in the area of Nork.

If you wish to subscribe again, please click the following link and follow the given instructions: ${radarLink}

Best regards,
The RADAR Team`;

const cancellationEmailHTML = `<p>Dear Sir/Madam,</p>

<p>You have now successfully unsubscribed from RADAR.</p>

<p>You will no longer receive email updates about upcoming developments in the area of Nork.</p>

<p>If you wish to subscribe again, please click <a href="${radarLink}">HERE</a> and follow the given instructions.</p>

<p>Best regards,<br>
The RADAR Team</p>`;

const sendWelcomeEmail = (email) => {
  sgMail.send({
    to: email,
    from: process.env.SENDER_EMAIL,
    subject: "Welcome to RADAR!",
    text: welcomeEmail(email),
    html: welcomeEmailHTML(email),
  });
};

const sendCancellationEmail = (email) => {
  sgMail.send({
    to: email,
    from: process.env.SENDER_EMAIL,
    subject: "We are sorry to see you go!",
    text: cancellationEmail,
    html: cancellationEmailHTML,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
};
