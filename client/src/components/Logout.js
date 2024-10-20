import React, { useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { UserContext } from '../App';

const Logout = () => {

  const {state,dispatch} = useContext(UserContext);
  const navigate = useNavigate(); // useNavigate hook

  useEffect(() => {
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
      dispatch({type:"USER",payload:false})
      navigate('/login', { replace: true }); 
    })
    .catch((error) => {
      console.log("Error during logout:", error);
    });
  }, [navigate, dispatch]); // Include 'navigate' in the dependency array

  return (
    <>
      <h1> Logout </h1>
    </>
  );
};

export default Logout;
