import { useEffect, useState } from "react";
import axios from "axios";
import "./JobSearchPageSetup.css";
import "../../index.css";
import ResumeDropZone from "../ResumeDropZone/ResumeDropZone.jsx"

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

function JobSearchSetupPage() {
  const [jobSearchSetupPageData, setJobSearchSetupPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Input Field States
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [workType, setWorkType] = useState("");

  useEffect(() => {
    getJobSearchSetupPageData();
  }, []);

  async function getJobSearchSetupPageData() {
    try {
      const response = await axios.get("http://localhost:5000/api/job-search-setup");

      console.log("setup page data:", response.data);

      setJobSearchSetupPageData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error getting Set Up Job Search Data:", error);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="page">
        <p>Loading setup page...</p>
      </main>
    );
  }

  if (!jobSearchSetupPageData) {
    return (
      <main className="page">
        <p>Could not load setup page data.</p>
      </main>
    );
  }

  function getInputStyles(value) {
    const isFilled = value.trim() !== "";

    const borderColor       = "#ffffff";
    const placeholderColor  = "var(--text)";
    const focusColor        = "var(--btn)";
    const filledColor       = "var(--input-filled)";

    return {
      "& .MuiOutlinedInput-root": {
        borderRadius: "10px",

        "& fieldset": {
          borderColor: isFilled ? filledColor : borderColor,
          borderWidth: ".75px",
        },

        "&:hover fieldset": {
          borderColor: isFilled ? filledColor : borderColor,
          borderWidth: "2px",
        },

        "&.Mui-focused fieldset": {
          borderColor: isFilled ? filledColor : focusColor,
          borderWidth: "2px",
        },
      },

      "& .MuiInputBase-input": {
        color: "white",
      },

      "& .MuiSelect-select": {
        color: "white",
      },

      "& .MuiSvgIcon-root": {
        color: isFilled ? filledColor : borderColor,
      },

      "& .MuiInputBase-input::placeholder": {
        color: placeholderColor,
        opacity: 1,
      },

      "& .MuiInputBase-input:focus::placeholder": {
        opacity: 0,
      },

      "& .MuiInputLabel-root": {
        color: isFilled ? filledColor : placeholderColor,
      },

      "& .MuiInputLabel-root.Mui-focused": {
        color: isFilled ? filledColor : focusColor,
      },
    };
  }

  return (
    <main className="page">
      <section className="setup-page">
        <div className="page-title">
          <h1>{jobSearchSetupPageData.pageTitle}</h1>
        </div>

        <p>Tell JobSearch AI what kind of job you are looking for.</p>

        <form className="setup-form">
          <div className="input-field-container">

            <TextField
              required
              id="job-title"
              label="Job Title, Keywords, or Company"
              placeholder="Job Title, Keywords, or Company"
              variant="outlined"
              margin="normal"
              fullWidth
              onChange={(event) => setJobTitle(event.target.value)}
              sx={getInputStyles(jobTitle)}
            />

            <TextField
              required
              label='City, State, Zip-Code, or "Remote"'
              type="text"
              fullWidth
              margin="normal"
              onChange={(event) => setLocation(event.target.value)}
              sx={getInputStyles(location)}
            />

            <TextField
              required
              select
              label="Select Work Type"
              defaultValue=""
              fullWidth
              margin="normal"
              onChange={(event) => setWorkType(event.target.value)}
              sx={getInputStyles(workType)}
            >
              {/* <MenuItem value="">Select work type</MenuItem> */}
              <MenuItem value="remote">Remote</MenuItem>
              <MenuItem value="hybrid">Hybrid</MenuItem>
              <MenuItem value="onsite">On-site</MenuItem>
            </TextField>
          </div>

          {/* <Button type="submit" variant="contained" fullWidth>
            Continue
          </Button> */}
        </form>
        <ResumeDropZone/>
      </section>
    </main>
  );
}

export default JobSearchSetupPage;