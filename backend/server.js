/*
    Express.js is a backend framework for Node.js.

    It helps you build a server that can:
    - Listen for requests from the browser or frontend
    - Create API routes like /api/landing
    - Send responses back as text, JSON, HTML, etc.

    In this project:
    - React will be the frontend
    - Express will be the backend
    - React will ask Express for data
    - Express will return that data as JSON
*/

// Import Express.
// require("express") loads the Express package from node_modules.
const express = require("express");

// Import CORS.
// CORS allows your React frontend to make requests to this Express backend.
const cors = require("cors");

// Load environment variables from the .env file.
// Example: PORT=5000
require("dotenv").config();

// Create an Express application.
// app is now your backend/server object.
const app = express();

/*
    app.use() adds middleware.

    Middleware is code that runs between:
    1. The request coming in
    2. The response going back out

    Think of middleware as "server helpers."
*/

// Enable CORS so another app, like React on localhost:5173,
// can call this backend on localhost:5000.
app.use(cors());

// Allow Express to understand JSON data in request bodies.
// This will matter later when React sends data to the backend.
app.use(express.json());

/*
    This creates a GET route for the homepage of the backend.

    Route:
    GET http://localhost:5000/

    req = request
    res = response

    req contains information about what the user/browser sent.
    res is what we send back.
*/
app.get("/", (req, res) => {
  // Send plain text back to the browser.
    res.send("JobSearch AI backend is running");
});

/*
    This creates a GET API route.

    Route:
    GET http://localhost:5000/api/landing

    This route sends landing page data to the frontend.
    Later, React will call this route using Axios.
*/
app.get("/api/landing", (req, res) => {
  // Send JSON data back to the frontend.
    res.json({
    appName: "JobSearch AI",
    appIcon: "./icon.png",
    headline: "AI-powered job search, resume matching, and application tracking.",
    subheadline:
        "Search job opportunities, save listings, analyze resume fit, generate tailored materials, and organize your job search workflow.",

    features: [
        "Search job opportunities",
        "Save selected jobs",
        "Analyze resume-to-job match",
        "Generate tailored cover letters",
        "Prepare for interviews",
        "Track application progress"
    ]
    });
});

/*
job-search-setup
*/
app.get("/api/job-search-setup", (req, res) => {
    res.json({
        pageTitle: "Start Your Job Search"
    });
});

/*
    Get the port number from the .env file.

    process.env.PORT means:
    "Look inside the environment variables for a variable named PORT."

    If PORT does not exist, use 5000 instead.
*/
const PORT = process.env.PORT || 5000;

/*
    Start the Express server.

    app.listen() tells Express:
    "Start running the backend and listen for requests on this port."
*/
app.listen(PORT, () => {
    console.log(`JobSearch AI backend running on http://localhost:${PORT}`);
});