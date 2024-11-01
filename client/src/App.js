import React, { createContext, useReducer } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import ErrorPage from './components/ErrorPage';
import VerifyEmailBox from './components/email/VerifyEmailbox'; 
import ForgotPassword from './components/ForgotPassword';

import { initialState, reducer } from './reducer/useReducer';

export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={state ? <About /> : <Navigate to="/login" />} />
          <Route path="/contact" element={state ? <Contact /> : <Navigate to="/login" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/verify" element={<VerifyEmailBox />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};

export default App;
