require("dotenv").config();

// require("express") loads the Express package from node_modules.
const express = require("express");

// Import CORS.
// CORS allows your React client to make requests to this Express server.
const cors = require("cors");

// Import routes.
const jSearchRoutes = require("./routes/jSearchRoute");
const resumeRoutes = require("./routes/resumeRoute");
const openaiTranscribeRoute = require("./routes/openaiTranscribeRoute");

// Create an Express application.
// app is now your server/server object.
const app = express();

// Enable CORS so another app, like React on localhost:5173,
// can call this server on localhost:5000.
app.use(cors());

// Allow Express to understand JSON data in request bodies.
app.use(express.json());

app.get("/", (req, res) => {
    res.send("JobSearch AI server is running");
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
app.use("/api/transcribe", openaiTranscribeRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`JobSearch AI server running on http://localhost:${PORT}`);
});