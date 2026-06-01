import { Box, Typography, Button } from "@mui/material";
import { useDropzone } from "react-dropzone";
import "./ResumeDropZone.css";
import uploadCloudIcon from "../../assets/upload-cloud.svg";

function ResumeDropZone() {
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
        useDropzone({
        accept: {
            "application/pdf": [".pdf"],
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
            ".docx",
            ],
        },
        maxFiles: 1,
        });

    const selectedFile = acceptedFiles[0];

    return (
        <div className="dropzone-container">
            <h3>Upload Your Resume</h3>

            <p>
                I'll save a copy of your original resume here! Then as you apply, I will
                make a new copy of your resume, tailoring it to the position you're
                applying for!
            </p>

            <Box
                {...getRootProps()}
                className={`resume-dropzone ${isDragActive ? "active" : ""} ${
                    acceptedFiles.length > 0 ? "has-file" : ""
                }`}
            >
                <input {...getInputProps()} />

                <img
                    src={uploadCloudIcon}
                    alt="Upload cloud"
                    className="upload-cloud-icon"
                />

                <Typography variant="body2">
                Accepted files: PDF, DOC, or DOCX
                </Typography>

                <Button variant="contained" sx={{ mt: 2 }}>
                Choose File
                </Button>

                {selectedFile && (
                <Typography className="selected-file" sx={{ mt: 2 }}>
                    Selected file: {selectedFile.name}
                </Typography>
                )}
            </Box>
        </div>
    );
}

export default ResumeDropZone;