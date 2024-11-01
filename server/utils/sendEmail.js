const nodemailer = require('nodemailer');
const { Welcome_Email_Template } = require('./EmailTemplate');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "yourmechai@gmail.com", // Replace with your email
    pass: "hgyxiuzsxhawalhq", // Replace with your generated app password
  },
});


module.exports = { transporter };
