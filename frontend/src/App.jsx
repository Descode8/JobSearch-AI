import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import JobSearchSetupPage from "./components/JobSearchSetupPage/JobSearchPageSetup.jsx";
import axios from "axios";
import "././App.css";
import "./index.css";

// App is your root React component.
// main.jsx renders this component into <div id="root"></div> in index.html.
function LandingPage() {
  /*
    landingData stores the data returned from your Express backend.

    Starting value is null because when the page first loads,
    we do not have the backend data yet.
  */
  const [landingData, setLandingData] = useState(null);

  /*
    loading stores whether the LandingPage is still waiting for data.

    Starting value is true because when the page first loads,
    we immediately need to fetch data from the backend.
  */
  const [loading, setLoading] = useState(true);

  /*
    useEffect runs after the component renders.

    The empty array [] means:
    "Only run this one time when the component first loads."

    This is similar to saying:
    "When the page opens, go get the landing page data."
  */
  useEffect(() => {
    getLandingData();
  }, []);

  /*
    This function calls the Express backend.

    async means this function can use await.
    await means wait for the request to finish before moving on.
  */
  async function getLandingData() {
    try {
      /*
        Axios sends a GET request to your Express route:

        Backend route:
        app.get("/api/landing", ...)

        Full URL:
        http://localhost:5000/api/landing

        This should return JSON data from your backend.
      */
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
        - Backend server is not running
        - Wrong backend URL
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
    that means the backend request probably failed.
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
      {/* Navbar section */}
      <nav className="navbar">
        {/* This value comes from the backend */}
        <div className="app-name-icon-container">
          <h2>{landingData.appName}</h2>
          <img src={landingData.appIcon} alt={`${landingData.appName} icon`} />
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
        </div>
      </nav>

      {/* Hero section */}
      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">AI Career Assistant</p>

          {/* This headline comes from the backend */}
          <h1>{landingData.headline}</h1>

          {/* This subheadline comes from the backend */}
          <p>{landingData.subheadline}</p>

          <div className="button-row">
            <Link to="/job-search-setup" className="primary-button">
              Get Started
            </Link>
            <button className="secondary-button">View Demo</button>
          </div>
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
            landingData.features is an array from the backend.

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