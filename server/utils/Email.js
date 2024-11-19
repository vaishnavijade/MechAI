const { Verification_Email_Template, Welcome_Email_Template } = require("./EmailTemplate.js");
const { transporter } = require("./sendEmail.js");

// responsible for sending an email
const sendVerificationCode = async (email, verificationCode) => {
  try {
    const info = await transporter.sendMail({
      from: '"Mechai" <yourmechai@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Verify your email", // Subject line
      text: `Your verification code is: ${verificationCode}`, // plain text body
      html: Verification_Email_Template.replace("{verificationCode}", verificationCode), // html body
    });
    console.log("Verification email sent: ", info);
  } catch (error) {
    console.error("Error sending verification email: ", error);
  }
};

const Welcome_Email = async (email) => {
  try {
    const info = await transporter.sendMail({
      from: '"Mechai" <yourmechai@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Welcome", // Subject line
      html: Welcome_Email_Template, // HTML body for the welcome email
    });
    console.log("Welcome email sent: ", info);
  } catch (error) {
    console.error("Error sending welcome email: ", error);
  }
};

// Export both functions
module.exports = { sendVerificationCode, Welcome_Email };
