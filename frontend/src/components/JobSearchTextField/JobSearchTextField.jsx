import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { getInputStyles } from "../../utils/muiStyles";
import "../../styles.css";
import "./JobSearchTextField.css";

function JobSearchTextField () {
    const [showText, setText] = useState("");

    return (
        <div className="job-search-text-field-container">
            <h3>Anything else I should know? Please share below.</h3>
            <p>
                I can use any extra details you share to improve your job search results,
                such as companies you are interested in, industries you want to target, roles
                you want to avoid, your preferred schedule, career goals, or anything important
                that may not be clear from your resume.
            </p>
            <TextField
                id="fullWidth"
                label="Type Here"
                type="text"
                multiline
                minRows={5}
                maxRows={10}
                fullWidth
                margin="normal"
                variant="outlined"
                value={showText}
                onChange={(event) => setText(event.target.value)}
                sx= { getInputStyles(showText) }
            />
        </div>
    )
}

export default JobSearchTextField;