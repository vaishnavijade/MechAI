import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import './Login.css'; // Ensure this is the right path

const Signup = () => {
  const navigate = useNavigate(); // useNavigate hook instead of useHistory
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/Signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, cpassword: confirmPassword }), // Send confirmPassword as cpassword
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        navigate("/Signup"); // Use navigate instead of history.push
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (error) {
      alert('Something went wrong!');
    }
  };

  return (
    <div className="wrapper">
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              autoComplete="off"
              value={email} // Using email state
              onChange={(e) => setEmail(e.target.value)} // Set the email state on input change
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              autoComplete="off"
              value={password} // Using password state
              onChange={(e) => setPassword(e.target.value)} // Set the password state on input change
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="confirmPassword" // Correct name attribute
              placeholder="Confirm Password"
              required
              autoComplete="off"
              value={confirmPassword} // Using confirmPassword state
              onChange={(e) => setConfirmPassword(e.target.value)} // Set confirmPassword state on input change
            />
          </div>
          <button type="submit">Register</button> {/* Ensure button type is submit */}
          <div className="register-link">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
