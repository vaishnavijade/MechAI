const Verification_Email_Template = `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; line-height: 1.6;">
    <h2>Verify Your Email</h2>
    <p>Thank you for registering! Please enter the following OTP to verify your email:</p>
    <p style="font-size: 20px; font-weight: bold;">{verificationCode}</p>
  </div>
`;

module.exports = { Verification_Email_Template };
