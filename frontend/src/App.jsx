import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import "./index.css";

function App() {
  const [landingData, setLandingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLandingData();
  }, []);

  async function getLandingData() {
    try {
      const response = await axios.get("http://localhost:5000/api/landing");

      setLandingData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error getting landing data:", error);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="page">
        <p>Loading JobSearch AI...</p>
      </main>
    );
  }

  if (!landingData) {
    return (
      <main className="page">
        <p>Could not load landing page data.</p>
      </main>
    );
  }

  return (
    <main className="page">
      <nav className="navbar">
        <h2>{landingData.appName}</h2>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">AI Career Assistant</p>

          <h1>{landingData.headline}</h1>

          <p>{landingData.subheadline}</p>

          <div className="button-row">
            <button className="primary-button">Get Started</button>
            <button className="secondary-button">View Demo</button>
          </div>
        </div>

        <div className="hero-card">
          <h3>Resume Match Score</h3>

          <div className="score">87%</div>

          <p>
            Compare your resume against job descriptions and get AI-powered
            recommendations.
          </p>
        </div>
      </section>

      <section id="features" className="features-section">
        <h2>Core Features</h2>

        <div className="features-grid">
          {landingData.features.map((feature) => (
            <div className="feature-card" key={feature}>
              <span>✓</span>
              <h3>{feature}</h3>
              <p>
                Use JobSearch AI to make this part of your job search faster,
                smarter, and easier to manage.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="steps-section">
        <h2>How It Works</h2>

        <div className="steps-grid">
          <div className="step-card">
            <span>01</span>
            <h3>Add your resume</h3>
            <p>Upload or paste your resume into JobSearch AI.</p>
          </div>

          <div className="step-card">
            <span>02</span>
            <h3>Search jobs</h3>
            <p>Search by title, location, remote preference, and technologies.</p>
          </div>

          <div className="step-card">
            <span>03</span>
            <h3>Use AI tools</h3>
            <p>Analyze job fit, create cover letters, and prepare for interviews.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;