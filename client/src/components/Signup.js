import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');  // State for username
  const [email, setEmail] = useState('');  // State for email
  const [password, setPassword] = useState('');  // State for password
  const [errorMessage, setErrorMessage] = useState('');  // Error message state
  const [isLoading, setIsLoading] = useState(false);  // Loading state
  const [otp, setOtp] = useState('');  // State for OTP input
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);  // OTP Modal visibility

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;
    if (!emailPattern.test(email)) {
      setErrorMessage('Email must end with @gmail.com or @yahoo.com');
      setIsLoading(false);
      return;
    }

    // Password validation
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      // Make a POST request to your backend for registration
      const response = await fetch('/Signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      // If registration fails, show the error message
      if (!data.success) {
        setErrorMessage(data.error || 'Something went wrong!');
        setIsLoading(false);
        return;
      }

      // Show success message and open OTP modal
      alert('Registration successful! Please verify your email.');
      setIsOtpModalVisible(true);  // Show OTP modal
      setIsLoading(false);
    } catch (error) {
      setErrorMessage('Something went wrong! Please try again.');
      setIsLoading(false);
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to verify the OTP
      const response = await fetch('/verifyemail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otp }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Email verified successfully! You can now log in.');
        navigate('/login');  // Redirect to login page after successful verification
      } else {
        // Show specific message if the OTP is incorrect
        alert(data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      alert('Something went wrong! Please try again.');
    }
  };

  return (
    <div className="wrapper">
      <div className="form-box">
        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
          <div className="register-link">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </form>

        {/* OTP Modal */}
        {isOtpModalVisible && (
          <div className="otp-modal">
            <div className="otp-modal-content">
              <h2>Verify Email</h2>
              <form onSubmit={handleOtpSubmit}>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <button type="submit">Verify OTP</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
