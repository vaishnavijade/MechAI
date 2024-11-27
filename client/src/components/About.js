import React from "react";

const About = () => {
  const pageStyle = {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: "16px",
    lineHeight: "1.75",
    color: "#333",
    padding: "60px 20px",
    backgroundColor: "#ffffff",
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    textAlign: "center",
    backgroundImage: "linear-gradient(to bottom right, #f8f8f8, #e6e6e6)",
  };

  const mainHeadingStyle = {
    fontSize: "36px",
    fontWeight: "600",
    color: "#800000",
    marginBottom: "10px",
    letterSpacing: "1px",
  };

  const subHeadingStyle = {
    fontSize: "20px",
    fontWeight: "400",
    color: "#555",
    marginBottom: "40px",
    maxWidth: "800px",
    lineHeight: "1.6",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
  };

  const boxStyle = {
    backgroundColor: "#f4f4f4",
    borderRadius: "10px",
    padding: "30px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.3s ease, transform 0.3s ease-in-out",
    cursor: "pointer",
  };

  const boxHeadingStyle = {
    fontSize: "28px",
    fontWeight: "600",
    color: "#800000",
    marginBottom: "15px",
    textTransform: "uppercase",
    letterSpacing: "2px",
  };

  const boxParagraphStyle = {
    fontSize: "16px",
    color: "#555",
    lineHeight: "1.6",
    textAlign: "left",
  };

  const handleHover = (e) => {
    e.target.style.transform = "scale(1.05)";
    e.target.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.2)";
  };

  const handleLeave = (e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
  };

  return (
    <div style={pageStyle}>
      <h1 style={mainHeadingStyle}>
        Welcome to MECH AI
      </h1>
      <h2 style={subHeadingStyle}>
        Your AI-Driven Solution for Vehicle Care
      </h2>

      <div style={gridStyle}>
        <div 
          style={boxStyle}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <h3 style={boxHeadingStyle}>Our Mission</h3>
          <p style={boxParagraphStyle}>
            At MECH AI, our mission is to revolutionize automotive care by providing accessible, reliable, and expert-level diagnostics to all. 
            We empower vehicle owners and professionals with AI-driven tools to maintain their vehicles efficiently.
          </p>
        </div>

        <div 
          style={boxStyle}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <h3 style={boxHeadingStyle}>Our Vision</h3>
          <p style={boxParagraphStyle}>
            Creating a world where car maintenance is simplified and accessible through cutting-edge AI technology. We strive to become 
            the leading platform for automotive diagnostics and repair solutions.
          </p>
        </div>

        <div 
          style={boxStyle}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <h3 style={boxHeadingStyle}>Why Choose Us</h3>
          <p style={boxParagraphStyle}>
            Access expert automotive knowledge at your fingertips with easy-to-follow instructions and accurate diagnostic reports. 
            Save time and money while keeping your vehicle in optimal condition.
          </p>
        </div>

        <div 
          style={boxStyle}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <h3 style={boxHeadingStyle}>Join Us</h3>
          <p style={boxParagraphStyle}>
            Experience the future of automotive maintenance with our intuitive and affordable platform. Get the most out of your 
            vehicle care with AI-powered solutions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;