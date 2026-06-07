import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

import JobSearchSetupPage from "./components/JobSearchSetupPage/JobSearchPageSetup.jsx";
import Navbar from "./components/Navbar/Navbar.jsx"

import "./App.css";
import "./styles.css";

import Button from "@mui/material/Button";
import { buttonStyles } from "./utils/muiStyles.js";


{/* App is your root React component. */}
{/* main.jsx renders this component into <div id="root"></div> in index.html. */}
function LandingPage() {
  const navigate = useNavigate();

  const [landingData, setLandingData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getLandingData();
  }, []);


  async function getLandingData() {
    try {

      const response = await axios.get("http://localhost:5000/api/landing");

        // setLandingData saves that object into React state.
        // When state changes, React re-renders the page.
      setLandingData(response.data);

      /*
        The request is finished, so loading becomes false.
        This lets React stop showing the loading message.
      */
      setLoading(false);
    } catch (error) {
      /*
        If something goes wrong, this 
        prints the error in the browser console.

        Common causes:
        - server server is not running
        - Wrong server URL
        - CORS issue
        - Express route does not exist
      */
      console.error("Error getting landing data:", error);

      /*
        Even if the request fails, we still stop loading.
        Otherwise, the app would say "Loading..." forever.
      */
    } finally {
      setLoading(false);
    }
  }

  /*
    Conditional rendering.

    If loading is true, React returns this loading screen
    instead of the normal landing page.
  */
  if (loading) {
    return (
      <main className="page">
        <p>Loading JobSearch AI...</p>
      </main>
    );
  }

  /*
    If loading is done but landingData is still null,
    that means the server request probably failed.
  */
  if (!landingData) {
    return (
      <main className="page">
        <p>Could not load landing page data.</p>
      </main>
    );
  }

  /*
    If we get here, that means:
    - loading is false
    - landingData exists
    - React can safely display the landing page
  */
  return (
    <main className="page">
      <Navbar/>
      {/* Hero section */}
      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">AI Career Assistant</p>

          {/* This headline comes from the server */}
          <h1>{landingData.headline}</h1>

          {/* This subheadline comes from the server */}
          <p>{landingData.subheadline}</p>
          
            <Button
              type="button"
              variant="contained"
              sx={{
                            ...buttonStyles, 
                            width: "100%",
                            maxWidth: "300px"}}
              onClick={() => navigate("/job-search-setup")}
            >
              Get Started
            </Button>
        </div>

        {/* Right-side hero card */}
        <div className="hero-card">
          <h3>Resume Match Score</h3>

          <div className="score">87%</div>

          <p>
            Compare your resume against job descriptions and get AI-powered
            recommendations.
          </p>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="features-section">
        <h2>Core Features</h2>

        <div className="features-grid">
          {/*
            landingData.features is an array from the server.

            Example:
            [
              "Search job opportunities",
              "Save selected jobs",
              "Analyze resume-to-job match"
            ]

            .map() loops through the array and creates one feature card
            for each feature.
          */}
          {landingData.features.map((feature) => (
            /*
              key={feature} helps React track each item in the list.

              React wants a unique key whenever you render a list.
            */
            <div className="feature-card" key={feature}>
              <span>✓</span>

              {/* feature is the current item from the array */}
              <h3>{feature}</h3>

              <p>
                Use JobSearch AI to make this part of your job search faster,
                smarter, and easier to manage.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works section */}
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/job-search-setup" element={<JobSearchSetupPage />} />
    </Routes>
  );
}

// This exports the App component so main.jsx can import and render it.
export default App;