import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { handleVerifyEmail } from "./verifyemail";


const EmailVerification = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await handleVerifyEmail(code, email);
    if (response.success) {
      setMessage("Email verified successfully! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login"; // Redirect to login after a short delay
      }, 2000);
    } else {
      setMessage(response.message); // Display error message if verification fails
    }
  };

  return (
    <div>
      <h2>Email Verification</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter Verification Code:</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Verify</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EmailVerification;
