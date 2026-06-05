const express = require("express");
const multer = require("multer");
const fs = require("fs");
const transcribeAudio = require("../services/openaiTranscribe");

const router = express.Router();

const upload = multer({
    dest: "uploads/",
});

router.post("/", upload.single("audio"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: "No audio file uploaded.",
            });
        }

        const transcriptText = await transcribeAudio(req.file.path);

        fs.unlinkSync(req.file.path);

        res.json({
            text: transcriptText,
        });
    } catch (error) {
        console.error("Transcription route error:", error);

        if (req.file?.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({
            error: "Failed to transcribe audio.",
        });
    }
});

module.exports = router;