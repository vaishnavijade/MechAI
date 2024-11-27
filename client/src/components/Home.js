import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
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
