import React from "react";

const About= () => {
  const pageStyle = {
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#e0e0e0",
    padding: "20px",
    textAlign: "center",
    // backgroundColor: "#000",
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box"
  };

  const headingStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#ffffff"
  };

  const subHeadingStyle = {
    fontSize: "18px",
    color: "#b0b0b0",
    marginBottom: "20px"
  };

  const paragraphStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    color: "#c0c0c0"
  };

  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>Welcome to MECH AI</h1>
      <h2 style={subHeadingStyle}>Your AI-Driven Solution for Vehicle Care</h2>
      <p style={paragraphStyle}>
        MECH AI is here to revolutionize car care by making expert-level automotive knowledge accessible to everyone. 
        Whether you're a car DIY enthusiast, a fleet manager, or simply someone who wants to understand their car better, 
        MECH.AI provides clear repair guides, accurate diagnostics, and cost-saving insights.
      </p>
      <p style={paragraphStyle}>
        Designed with user-friendliness in mind, our platform empowers you to diagnose car issues, learn step-by-step 
        repair techniques, and save on maintenance costs—all while gaining deeper knowledge about your vehicle.
      </p>
      <p style={paragraphStyle}>
        Join us on this journey to simplify car care and experience the future of automotive maintenance with MECH AI.
      </p>
    </div>
  );
};

export default About;
