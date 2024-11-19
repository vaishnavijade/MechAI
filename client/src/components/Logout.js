import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { UserContext } from '../App';

const Logout = () => {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Attempt to log the user out on the server
    fetch('/logout', {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: 'include'
    })
    .then((res) => {
      if (res.status !== 200) {
        throw new Error("Failed to logout");
      }
      // Clear token from localStorage and update global state
      localStorage.removeItem('authToken');
      dispatch({ type: "USER", payload: false });

      // Navigate to the login page after successful logout
      navigate('/login', { replace: true });
    })
    .catch((error) => {
      console.log("Error during logout:", error);
    });
  }, [navigate, dispatch]); // Ensure this line is correct and contains no extra characters

  return (
    <h1>Logging out...</h1>
  );
};

export default Logout;
