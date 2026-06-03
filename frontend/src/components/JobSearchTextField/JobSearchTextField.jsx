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
            <TextField
                id="fullWidth"
                label='Type Here'
                type="text"
                multiline
                minRows={5}
                maxRows={10}
                fullWidth
                margin="normal"
                value={showText}
                onChange={(event) => setText(event.target.value)}
                sx={getInputStyles(showText)}
            />
        </div>
    )
}

export default JobSearchTextField;