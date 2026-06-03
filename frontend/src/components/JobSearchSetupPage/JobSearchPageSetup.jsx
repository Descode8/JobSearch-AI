import { useEffect, useState } from "react";
import axios from "axios";
import "./JobSearchPageSetup.css";
import "../../styles.css";
import {
  getInputStyles,
  getDropdownMenuProps,
  dropdownItemStyles,
} from "../../utils/muiStyles";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import ResumeDropZone from "../ResumeDropZone/ResumeDropZone.jsx";
import JobSearchTextField from "../JobSearchTextField/JobSearchTextField.jsx";

function JobSearchSetupPage() {
  const [jobSearchSetupPageData, setJobSearchSetupPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Input Field States
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [workType, setWorkType] = useState("");

  // Resume State
  const [resumeFile, setResumeFile] = useState(null);
  const [resumePreviewUrl, setResumePreviewUrl] = useState("");

  useEffect(() => {
    getJobSearchSetupPageData();
  }, []);

  async function getJobSearchSetupPageData() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/job-search-setup"
      );

      console.log("setup page data:", response.data);

      setJobSearchSetupPageData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error getting Set Up Job Search Data:", error);
      setLoading(false);
    }
  }

  function handleResumeSelected(file, previewUrl) {
    setResumeFile(file);
    setResumePreviewUrl(previewUrl);

    console.log("Selected resume file:", file);
    console.log("Resume preview URL:", previewUrl);
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
              value={jobTitle}
              onChange={(event) => setJobTitle(event.target.value)}
              sx={getInputStyles(jobTitle)}
            />

            <TextField
              required
              id="location"
              label='City, State, Zip-Code, or "Remote"'
              type="text"
              fullWidth
              margin="normal"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              sx={getInputStyles(location)}
            />

            <TextField
              required
              select
              id="salary-range"
              label="Salary Range"
              placeholder="Salary Range"
              variant="outlined"
              margin="normal"
              fullWidth
              value={salaryRange}
              onChange={(event) => setSalaryRange(event.target.value)}
              sx={getInputStyles(salaryRange)}
              slotProps={{
                select: {
                  MenuProps: getDropdownMenuProps(),
                },
              }}
            >
              <MenuItem sx={dropdownItemStyles} value="40000-50000">
                $40,000 - $50,000
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="50000-60000">
                $50,000 - $60,000
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="60000-70000">
                $60,000 - $70,000
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="70000-80000">
                $70,000 - $80,000
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="80000-90000">
                $80,000 - $90,000
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="90000-100000">
                $90,000 - $100,000
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="100000-120000">
                $100,000 - $120,000
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="120000-150000">
                $120,000 - $150,000
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="150000-plus">
                $150,000 +
              </MenuItem>
            </TextField>

            <TextField
              required
              select
              id="work-type"
              label="Select Work Type"
              value={workType}
              fullWidth
              margin="normal"
              onChange={(event) => setWorkType(event.target.value)}
              sx={getInputStyles(workType)}
              slotProps={{
                select: {
                  MenuProps: getDropdownMenuProps(),
                },
              }}
            >
              <MenuItem sx={dropdownItemStyles} value="remote">
                Remote
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="hybrid">
                Hybrid
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="onsite">
                On-site
              </MenuItem>
            </TextField>
          </div>
        </form>

        <ResumeDropZone onFileSelected={handleResumeSelected} />
        <JobSearchTextField></JobSearchTextField>
      </section>
    </main>
  );
}

export default JobSearchSetupPage;