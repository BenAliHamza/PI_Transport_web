const { google } = require('googleapis');
const nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken');
const ejs = require("ejs");
const path = require("path");
require('dotenv').config();
const fs = require("fs");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET =process.env.CLIENT_SECRET;
const REDICRECT_URL ='https://developers.google.com/oauthplayground';
const REFRESH_TOKEN =process.env.OAUTH_REFRESH
const MY_EMAIL = "espritcotransport@gmail.com"  ;
  const oAuth_client =  new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDICRECT_URL
);
oAuth_client.setCredentials({
  refresh_token : REFRESH_TOKEN
})



async function sendActivationEmail(user) {
  try {
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    const activationLink = `http://localhost:3000/users/activate_account/${token}`;
    const access = await oAuth_client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use 'gmail' for Gmail SMTP
      auth: {
        type: 'OAuth2',
        user: 'espritcotransport@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: access,
      }
    });

    const templatePath = path.resolve(__dirname, '../email_templates/activation_email_template.html');
    const htmlContent = await ejs.renderFile(templatePath, {
      name: user.firstname,
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
    return activationLink ;
  } catch (error) {
    console.error('Error sending activation email:', error);
  }
}
async function sendNotificationEmail(user,categorie) {
  try {
    const access = await oAuth_client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use 'gmail' for Gmail SMTP
      auth: {
        type: 'OAuth2',
        user: 'espritcotransport@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: access,
      }
    });

   const templatePath = path.resolve(__dirname, '../email_templates/notification_email_template.html');
    const htmlContent = await ejs.renderFile(templatePath, {
      name: user.firstname,
      categorie: categorie
         });

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Favorite category',
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Activation email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending activation email:', error);
  }
}
async function sendReservationEmail(user) {
  try {
    const access = await oAuth_client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use 'gmail' for Gmail SMTP
      auth: {
        type: 'OAuth2',
        user: 'espritcotransport@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: access,
      }
    });
 
    const templatePath = path.resolve(__dirname, '../email_templates/ReservationEmail.html');
    const htmlContent = await ejs.renderFile(templatePath, {
      name: "Oussama",
     
    });
 
    const mailOptions = {
      from: process.env.EMAIL,
      to: "oussamadridi.etudiant@gmail.com ",
      subject: 'Confirmation Reservation',
      html: htmlContent,
    };
 
    await transporter.sendMail(mailOptions);
    console.log(`Activation email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending activation email:', error);
  }
}
 
async function sendAnnonceEmail(user) {
  try {
   
 
    const access = await oAuth_client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use 'gmail' for Gmail SMTP
      auth: {
        type: 'OAuth2',
        user: 'espritcotransport@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: access,
      }
    });
 
    const templatePath = path.resolve(__dirname, '../email_templates/annoceEmail.html');
    const htmlContent = await ejs.renderFile(templatePath, {
      name: "Oussama",
     
    });
 
    const mailOptions = {
      from: process.env.EMAIL,
      to: "oussamadridi.etudiant@gmail.com ",
      subject: 'Confirmation Annonce',
      html: htmlContent,
    };
 
    await transporter.sendMail(mailOptions);
    console.log(`Activation email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending activation email:', error);
  }
}


async function sendAnnonceEmail(user) {
  try {
    

    const access = await oAuth_client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use 'gmail' for Gmail SMTP
      auth: {
        type: 'OAuth2',
        user: 'espritcotransport@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: access,
      }
    });

    const templatePath = path.resolve(__dirname, '../email_templates/annoceEmail.html');
    const htmlContent = await ejs.renderFile(templatePath, {
      name: "Oussama",
      
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: "oussamadridi.etudiant@gmail.com ",
      subject: 'Confirmation Annonce',
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Activation email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending activation email:', error);
  }
}
module.exports = { sendNotificationEmail,sendActivationEmail ,sendReservationEmail, sendAnnonceEmail};

