import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { Document, Page, pdfjs } from "react-pdf";
import "./ResumeDropZone.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import uploadCloudIcon from "../../assets/upload-cloud.svg";
import { buttonStyles } from "../../utils/muiStyles";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

function ResumeDropZone({ onFileSelected }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        accept: {
        "application/pdf": [".pdf"],
        },
        maxFiles: 1,
        noClick: true,
        noKeyboard: true,
        onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0];

        if (!file) return;

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }

        const temporaryPreviewUrl = URL.createObjectURL(file);

        setSelectedFile(file);
        setPreviewUrl(temporaryPreviewUrl);

        if (onFileSelected) {
            onFileSelected(file, temporaryPreviewUrl);
        }
        },
    });

    useEffect(() => {
        return () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        };
    }, [previewUrl]);

    function removeResume() {
        if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        }

        setSelectedFile(null);
        setPreviewUrl("");

        if (onFileSelected) {
        onFileSelected(null, "");
        }
    }

    return (
        <div className="dropzone-container">
        <h3>Upload Your Resume</h3>

        <p>
            I'll save a copy of your original resume here! Then as you apply, I will
            make a new copy of your resume, tailoring it to the position you're
            applying for!
        </p>

        {!selectedFile && (
            <Box
                {...getRootProps()}
                className={`resume-dropzone ${isDragActive ? "active" : ""}`}
                >
                <input {...getInputProps()} />

                <img
                    src={uploadCloudIcon}
                    alt="Upload cloud"
                    className="upload-cloud-icon"
                />

                <Typography variant="body2">Accepted file: PDF</Typography>

                <Button
                    type="button"
                    variant="contained"
                    sx={ buttonStyles }
                    onClick={open}
                >
                    Choose File
                </Button>
            </Box>
        )}

        {selectedFile && (
            <div className="resume-preview-card">
                <div className="resume-preview-header">
                    <div className="resume-file-info">
                        <div className="resume-file-icon">📄</div>

                        <div>
                            <h4>{selectedFile.name}</h4>
                            <p>Uploaded today</p>
                        </div>
                    </div>

                    <div className="resume-check-icon">✓</div>
                </div>

                <div className="resume-preview-body">
                    <div className="resume-pdf-preview">
                    <Document
                        file={previewUrl}
                        loading={
                        <p className="resume-preview-message">Loading preview...</p>
                        }
                        error={
                        <p className="resume-preview-message">
                            Could not load PDF preview.
                        </p>
                        }
                    >
                        <Page
                        pageNumber={1}
                        width={520}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        />
                    </Document>
                    </div>
                </div>

                <div className="resume-preview-actions single-action">
                    <Button
                    type="button"
                    variant="contained"
                    fullWidth
                    onClick={removeResume}
                    sx={buttonStyles}
                    >
                    Remove
                    </Button>
                </div>
            </div>
        )}
        </div>
    );
}

export default ResumeDropZone;