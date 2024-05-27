const nodemailer = require('nodemailer');
const  {google } = require('googleapis')
const jwt = require('jsonwebtoken');
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");


require('dotenv').config()

const Oauth2 = google.auth.OAuth2

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
async function sendActivationEmail(user) {
  try {
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    const activationLink = `http://localhost:3001/users/activate_account/${token}`;

    const templatePath = path.resolve(__dirname, '../email_templates/activation_email_template.html');
    const htmlContent = await ejs.renderFile(templatePath, {
      name: user.name,
      email: user.email,
      link: activationLink
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Account Activation',
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Activation email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending activation email:', error);
  }
}


module.exports = {sendActivationEmail};
