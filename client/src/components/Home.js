import React from 'react';
import './Home.css';
import carImage from '../images/carimgg.jpg'; // Adjust the path as needed

function Home() {
  return (
    <div className="home">
      <section
        className="hero"
        style={{ backgroundImage: `url(${carImage})` }}
      >
        <div className="hero-content">
          <h1>Revolutionize Your Car Diagnostics</h1>
          <p>Utilize AI to diagnose and resolve car issues with ease.</p>
          <button 
            className="get-started-btn"
            onClick={() => window.location.href = '/chatbot'}
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
