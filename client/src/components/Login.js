import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate for redirect
import './Login.css';

const Login = () => {
  const navigate = useNavigate(); // Use navigate for redirection
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful!');
        navigate('/'); // Navigate to dashboard or appropriate page
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      alert('Something went wrong!');
    }
  };

  return (
    <div className="wrapper">
      <div className="form-box Login">
        <form onSubmit={handleSubmit}> {/* Added onSubmit handler */}
          <h1>Login</h1>

          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              autoComplete="off"
              value={email} // Set value to state
              onChange={(e) => setEmail(e.target.value)} // Update state on change
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              autoComplete="off"
              value={password} // Set value to state
              onChange={(e) => setPassword(e.target.value)} // Update state on change
            />
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <Link to="/forgot-password">Forgot Password</Link>
          </div>

          <button type="submit">Login</button> {/* Ensure button type is submit */}

          <div className="register-link">
            <p>
              Don't have an account? <Link to="/Signup">Register</Link> {/* Use Link for navigation */}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
