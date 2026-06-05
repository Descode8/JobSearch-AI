import TextField from "@mui/material/TextField";
import { getInputStyles } from "../../utils/muiStyles";
import VoiceInput from "../VoiceToText/VoiceInput";
import "../../styles.css";
import "./JobSearchTextField.css";

function JobSearchTextField(props) {
    {/* Receives props from the parent component (JobSearchPageSetup) */}
    const value = props.value;
    const onChange = props.onChange;

    function handleTranscriptionComplete(transcribedText) {
        const cleanedText = transcribedText.trim();

        if (!cleanedText) return;

        const updatedText = value.trim()
            ? `${value.trim()}\n\n${cleanedText}`
            : cleanedText;

        onChange(updatedText);
    }

    return (
        <div className="job-search-text-field-container">
            <h3>Anything else I should know? Please share below.</h3>

            <p>
                I can use any extra details you share to improve your job search results,
                such as companies you are interested in, industries you want to target, roles
                you want to avoid, your preferred schedule, career goals, certain benefits, or anything important
                that may not be clear from your resume.
            </p>

            <div className="extra-details-input-wrapper">
                <TextField
                    id="fullWidth"
                    label="Extra Details"
                    placeholder="Type or Record Voice Here..."
                    type="text"
                    multiline
                    minRows={5}
                    maxRows={10}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    sx={{
                        ...getInputStyles(value),

                        "& .MuiInputBase-inputMultiline": {
                            paddingBottom: "50px",
                        },
                    }}
                />

                <VoiceInput onTranscriptionComplete={handleTranscriptionComplete} />
            </div>
        </div>
    );
}

export default JobSearchTextField;