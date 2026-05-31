import { useEffect, useState } from "react";
import axios from "axios";
import "./JobSearchPageSetup.css";

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
    const defaultColor = "oklch(44.6% 0.03 256.802)";
    const focusColor = "#0f62fe";
    const filledColor = "#27ae60";

    return {
      // Styles the outer MUI outlined input container
      "& .MuiOutlinedInput-root": {
        borderRadius: "10px",

        // Default border before hover or focus
        "& fieldset": {
          borderColor: isFilled ? filledColor : defaultColor,
          borderWidth: ".5px",
        },

        // Border when the mouse is hovering over the input
        "&:hover fieldset": {
          borderColor: isFilled ? filledColor : defaultColor,
          borderWidth: "1px",
        },

        // Border when the input is selected/focused
        "&.Mui-focused fieldset": {
          borderColor: isFilled ? filledColor : focusColor,
          borderWidth: "2px",
        },
      },

      // Text the user types inside regular text inputs
      "& .MuiInputBase-input": {
        color: "white",
      },

      // Text shown inside the dropdown/select field
      "& .MuiSelect-select": {
        color: "white",
      },

      // Dropdown arrow icon color
      "& .MuiSvgIcon-root": {
        color: isFilled ? filledColor : defaultColor,
      },

      // Placeholder text before the user types
      "& .MuiInputBase-input::placeholder": {
        color: defaultColor,
        opacity: 1,
      },

      // Hides the placeholder when the input is focused
      "& .MuiInputBase-input:focus::placeholder": {
        opacity: 0,
      },

      // Default label text color
      "& .MuiInputLabel-root": {
        color: isFilled ? filledColor : defaultColor,
      },

      // Label text color when the input is focused
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
      </section>
    </main>
  );
}

export default JobSearchSetupPage;