import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate for redirect
import './Login.css';
import { UserContext } from '../App';

const Login = () => {
  const { state, dispatch } = useContext(UserContext); // Access state and dispatch

  const navigate = useNavigate(); // Use navigate for redirection
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password
      });

      const data = await response.json();

      if (response.ok) {
        
        // Update the global user state using context (optional)
        dispatch({ type: 'USER', payload: true });
        
         // Store JWT token in localStorage
         localStorage.setItem('authToken', data.token);

        alert('Login successful!');
        navigate('/'); // Navigate to the homepage or dashboard
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
