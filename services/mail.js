const nodemailer = require("nodemailer");
require('dotenv').config();

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PWD
  }
});

let sendMail = (mailOptions)=>{
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
      return console.log(error);
  }
});
};

module.exports = sendMail;