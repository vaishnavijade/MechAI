const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const { sendVerificationCode, Welcome_Email } = require("../utils/Email");
require("../db/conn");

const User = require("../model/userSchema");

// Basic route to confirm server connection
router.get("/", (req, res) => {
  res.send("Hello World from server router.js");
});

// Signup route
router.post("/Signup", async (req, res) => {
  const { username,email, password } = req.body;

  // Validations for required fields
  if (!username || !email || !password ) {
    return res
      .status(422)
      .json({ success: false, error: "Fill the fields properly" });
  }

  // Email pattern validation for specific domains
  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!emailPattern.test(email)) {
    return res
      .status(422)
      .json({
        success: false,
        error: "Email must end with @gmail.com ",
      });
  }

  // Password pattern validation
  if (password.length < 6) {
    return res
      .status(422)
      .json({
        success: false,
        error: "Password must be at least 6 characters long",
      });
  }

  try {
    // Check if user already exists
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res
        .status(422)
        .json({ success: false, error: "Email already exists" });
    }

    // Create a new user
    const user = new User({
      username,
      email,
      password,
      verificationCode: Math.floor(100000 + Math.random() * 900000).toString(),
    });

    // Save new user to the database
    await user.save();

    // Send verification code
    await sendVerificationCode(user.email, user.verificationCode);

    return res
      .status(201)
      .json({
        success: true,
        message: "Registration successful! Please verify your email.",
      });
  } catch (err) {
    console.error("Registration error:", err);
    return res
      .status(500)
      .json({ success: false, error: "Registration failed. Try again later." });
  }
});

// Email Verification Route
router.post("/verifyemail", async (req, res) => {
  console.log("Received verification request:");
  try {
    const { code, email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    if (user.verificationCode !== code) {
      console.log(
        `Expected code: ${user.verificationCode}, Received code: ${code}`
      );
      return res
        .status(400)
        .json({ success: false, message: "Incorrect code" });
    }

    user.verified = true; // Mark user as verified
    user.verificationCode = undefined; // Clear the verification code once verified
    await user.save();

    // await Welcome_Email(user.email); // Send a welcome email after successful verification
    return res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error("Error during verification:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

// Login route
router.post("/Login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Fill all the fields" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      // Check if email is verified before allowing login
      if (!userLogin.verified) {
        return res
          .status(403)
          .json({
            success: false,
            error: "Please verify your email before logging in",
          });
      }

      // Compare entered password with stored hashed password
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid credentials" });
      }

      // Generate and send JWT token as a cookie
      const token = await userLogin.generateAuthToken();
      console.log(token);

      // res.cookie("jwtoken", token, {
      //   expires: new Date(Date.now() + 25892000000), // Cookie expiration time set
      //   httpOnly: true,
      // });

      return res.json({
        success: true,
        message: "User signed in successfully",
        token,  // Send the token in the response body
      });
    } else {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Login error:", err);
    return res
      .status(500)
      .json({ success: false, error: "Login failed. Try again later." });
  }
});

// Request OTP for password reset
router.post("/request-password-reset", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Generate a new OTP and save it to the user
    user.verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    await user.save();

    // Send OTP email
    await sendVerificationCode(email, user.verificationCode);

    res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Verify OTP for password reset
router.post("/verify-reset-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.verificationCode !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    res.json({ success: true, message: "OTP verified" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Reset password route
router.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;
  console.log("New Password:", newPassword);

  try {
      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
          console.error("User not found:", email);
          return res.status(400).json({ success: false, message: "User not found" });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      console.log("Hashed password:", hashedPassword);

      // Use updateOne to directly update the password in the database
      const updateResult = await User.updateOne({ email }, { password: hashedPassword });
      console.log("Update Result:", updateResult);

      // Check if the password was updated successfully
      if (updateResult.modifiedCount === 1) {
          console.log("Password updated successfully for user:", email);
          return res.status(200).json({ success: true, message: "Password reset successful!" });
      } else {
          console.error("Password update failed");
          return res.status(500).json({ success: false, message: "Failed to update password" });
      }
  } catch (error) {
      console.error("Error during password reset:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
  }
});


// About route - requires authentication
router.get("/about", authenticate, (req, res) => {
  console.log("Accessing about page");
  res.send(req.rootUser);
});

// Logout route - clears the JWT cookie
router.get("/logout", (req, res) => {
  console.log("User logging out");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User logged out");
});

module.exports = router;
