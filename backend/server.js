// require("express") loads the Express package from node_modules.
const express = require("express");

// For Express, you need a package called multer to receive uploaded files.
const multer = require("multer");

// Import CORS.
// CORS allows your React frontend to make requests to this Express backend.
const cors = require("cors");

// Load environment variables from the .env file.
// Example: PORT=5000
require("dotenv").config();

// Create an Express application.
// app is now your backend/server object.
const app = express();

// Enable CORS so another app, like React on localhost:5173,
// can call this backend on localhost:5000.
app.use(cors());

// Allow Express to understand JSON data in request bodies.
// This will matter later when React sends data to the backend.
app.use(express.json());

// Multer handles multipart/form-data.
// This is needed because React is sending FormData with a PDF file.
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "application/pdf") {
        return cb(new Error("Only PDF files are allowed"));
        }

        cb(null, true);
    },
});

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

app.get("/api/landing", (req, res) => {
  // Send JSON data back to the frontend.
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

/*
job-search-setup
*/
app.get("/api/job-search-setup", (req, res) => {
    res.json({
        pageTitle: "Start Your Job Search"
    });
});

/*
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


app.post("/api/job-search-submit", upload.single("resume"), async (req, res) => {
    console.log("job-search-submit backend called!")
    // try {
    //     const jobTitle = req.body.jobTitle;
    //     const location = req.body.location;
    //     const salaryRange = req.body.salaryRange;
    //     const workType = req.body.workType;
    //     const extraDetails = req.body.extraDetails;

    //     const resumeFile = req.file;

    //     if (!resumeFile) {
    //         return res.status(400).json({
    //             error: "Resume PDF is required",
    //         });
    //     }

    //     console.log("Job Title:", jobTitle);
    //     console.log("Location:", location);
    //     console.log("Salary Range:", salaryRange);
    //     console.log("Work Type:", workType);
    //     console.log("Extra Details:", extraDetails);

    //     console.log("Resume Original Name:", resumeFile.originalname);
    //     console.log("Resume MIME Type:", resumeFile.mimetype);
    //     console.log("Resume Size:", resumeFile.size);
    //     console.log("Resume Buffer:", resumeFile.buffer);

    //     const openAiPayload = {
    //         jobTitle: jobTitle,
    //         location: location,
    //         salaryRange: salaryRange,
    //         workType: workType,
    //         extraDetails: extraDetails,
    //         resume: {
    //             originalName: resumeFile.originalname,
    //             mimeType: resumeFile.mimetype,
    //             size: resumeFile.size,
    //             buffer: resumeFile.buffer,
    //         },
    //     };

    //     console.log("Payload ready for OpenAI:", openAiPayload);

    //     res.json({
    //         message: "Job search setup submitted successfully",
    //         receivedData: {
    //             jobTitle,
    //             location,
    //             salaryRange,
    //             workType,
    //             extraDetails,
    //             resumeFileName: resumeFile.originalname,
    //             resumeFileSize: resumeFile.size,
    //             },
    //         });
    // } catch (error) {
    //     console.error("Error submitting job search setup:", error);

    //     res.status(500).json({
    //     error: "Something went wrong while submitting the job search setup",
    //     });
    // }
});