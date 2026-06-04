const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

router.post("/upload", upload.single("resume"), async (req, res) => {
    try {
        const resumeFile = req.file;

        if (!resumeFile) {
            return res.status(400).json({
                error: "Resume PDF is required",
            });
        }

        console.log("Resume file received:", {
            originalName: resumeFile.originalname,
            mimeType: resumeFile.mimetype,
            size: resumeFile.size,
        });

        res.json({
            message: "Resume uploaded successfully",
            resume: {
                originalName: resumeFile.originalname,
                mimeType: resumeFile.mimetype,
                size: resumeFile.size,
            },
        });
    } catch (error) {
        console.error("Error uploading resume:", error);

        res.status(500).json({
            error: "Something went wrong while uploading the resume.",
        });
    }
});

module.exports = router;