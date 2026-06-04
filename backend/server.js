// require("express") loads the Express package from node_modules.
const express = require("express");

// Import CORS.
// CORS allows your React frontend to make requests to this Express backend.
const cors = require("cors");

// Load environment variables from the .env file.
// Example: PORT=5000
require("dotenv").config();

// Import routes.
const jSearchRoutes = require("./routes/jSearchRoute");
const resumeRoutes = require("./routes/resumeRoute");

// Create an Express application.
// app is now your backend/server object.
const app = express();

// Enable CORS so another app, like React on localhost:5173,
// can call this backend on localhost:5000.
app.use(cors());

// Allow Express to understand JSON data in request bodies.
app.use(express.json());

app.get("/", (req, res) => {
    res.send("JobSearch AI backend is running");
});

app.get("/api/landing", (req, res) => {
    res.json({
        appName: "JobSearch AI",
        appIcon: "./images/icons/icon.svg",
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

app.get("/api/job-search-setup", (req, res) => {
    res.json({
        pageTitle: "Start Your Job Search"
    });
});

// Route files.
app.use("/api/jobs", jSearchRoutes);
app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`JobSearch AI backend running on http://localhost:${PORT}`);
});