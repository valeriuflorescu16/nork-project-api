require("dotenv").config();

const sgMail = require("@sendgrid/mail");
const unsubscribeURL = process.env.UNSUBSCRIBE_URL;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const emailMessageBuilder = (messageArr, recipientEmail) => {
  let message = `Dear Sir/Madam,
  
  ${messageArr[0]}
  
  `;

  for (let i = 1; i < messageArr.length; i++) {
    message += `${messageArr[i]}

`;
  }

  message += `Best regards,
The RADAR Team

To unsubscribe from our emails, please click the following link: ${unsubscribeURL}/${recipientEmail}`;

  return message;
};

const HTMLemailMessageBuilder = (messageArr, recipientEmail) => {
  let message = `<p>Dear Sir/Madam,</p>`;

  messageArr.forEach((paragraph) => (message += `<p>${paragraph}</p>`));

  message += `<p>Best regards,<br>The RADAR Team</p>
  <p>To unsubscribe from our emails, please click <a href="${unsubscribeURL}/${recipientEmail}">HERE</a></p>`;

  return message;
};

const sendCustomEmail = async (emails, subject, message, attachments) => {
  for (let i = 0; i < emails.length; i++) {
    const recipientEmail = emails[i];
    const emailMessage = emailMessageBuilder(message, recipientEmail);
    const htmlEmailMessage = HTMLemailMessageBuilder(message, recipientEmail);

    sgMail.send({
      to: recipientEmail,
      from: process.env.SENDER_EMAIL,
      subject: subject,
      text: emailMessage,
      html: htmlEmailMessage,
      attachments: attachments,
    });
  }
};

module.exports = {
  sendCustomEmail,
};
