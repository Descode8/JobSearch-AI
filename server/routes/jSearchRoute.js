const express = require("express");
const router = express.Router();

router.post("/search", async (req, res) => {
    try {
        const {
            jobTitle,
            location,
            salaryRange,
            workType,
            experienceLevel,
            targetCompany,
            veteranStatus,
            securityClearance,
            extraDetails,
        } = req.body;

        const jobSearchPayload = {
            jobTitle,
            location,
            salaryRange,
            workType,
            experienceLevel,
            targetCompany,
            veteranStatus,
            securityClearance,
            extraDetails,
        };

        console.log("Job search payload received:", jobSearchPayload);

        res.json({
            message: "Job search data received successfully",
            jobSearchPayload,
        });
    } catch (error) {
        console.error("Error receiving job search data:", error);

        res.status(500).json({
            error: "Something went wrong while receiving job search data.",
        });
    }
});

module.exports = router;