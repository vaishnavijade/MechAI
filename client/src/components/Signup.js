import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false); // Modal visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;
    if (!emailPattern.test(email)) {
      setErrorMessage('Email must end with @gmail.com or @yahoo.com');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/Signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, cpassword: confirmPassword }),
      });

      const data = await response.json();

      if (!data.success) {
        setErrorMessage(data.error);
        setIsLoading(false);
        return;
      }

      alert('Registration successful! Please verify your email.');
      setIsOtpModalVisible(true); // Show OTP modal
      setIsLoading(false);
    } catch (error) {
      setErrorMessage('Something went wrong!');
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/verifyemail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otp }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Email verified successfully! You can now log in.');
        navigate('/login');
      } else {
        // Check for specific message
        if (data.message === "Incorrect code") {
          alert('Incorrect code. Please try again.');
        } else {
          alert(data.message || 'An error occurred. Try again.');
        }
      }
    } catch (error) {
      alert('Something went wrong!');
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
          <div className="input-box">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              autoComplete="off"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
