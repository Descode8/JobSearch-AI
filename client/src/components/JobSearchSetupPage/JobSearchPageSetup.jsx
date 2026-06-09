import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../Navbar/Navbar.jsx";

import "./JobSearchPageSetup.css";
import "../../styles.css";
import {
  getInputStyles,
  getDropdownMenuProps,
  dropdownItemStyles,
  buttonStyles,
} from "../../utils/muiStyles.js";
import { targetCompanies } from "../../utils/companyOptions.js";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import ResumeDropZone from "../ResumeDropZone/ResumeDropZone.jsx";
import JobSearchTextField from "../JobSearchTextField/JobSearchTextField.jsx";
import Notification from "../Notification/Notification.jsx";

function JobSearchSetupPage() {
  const navigate = useNavigate();

  const [jobSearchSetupPageData, setJobSearchSetupPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [notification, setNotification] = useState("");
  const notificationTimerRef = useRef(null);

  function showNotification(type) {
    setNotification(type);

    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current);
    }

    notificationTimerRef.current = setTimeout(() => {
      setNotification("");
    }, 3200);
  }

  // Input Field States
  const [jobTitle, setJobTitle]       = useState("");
  const [location, setLocation]       = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [workType, setWorkType]       = useState("");
  const [distance, setDistance]       = useState("");
  
  const [education, setEducation]                 = useState("");
  const [experienceLevel, setExperienceLevel]     = useState("");
  const [targetCompany, setTargetCompany]         = useState("");
  const [veteranStatus, setVeteranStatus]         = useState("");
  const [securityClearance, setSecurityClearance] = useState("");


  const [extraDetails, setExtraDetails]           = useState("");

  // Resume State
  const [resumeFile, setResumeFile] = useState(null);
  const [resumePreviewUrl, setResumePreviewUrl] = useState("");

  useEffect(() => {
    getJobSearchSetupPageData();
  }, []);

  useEffect(() => {
    return () => {
      if (notificationTimerRef.current) {
        clearTimeout(notificationTimerRef.current);
      }
    };
  }, []);

  async function getJobSearchSetupPageData() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/job-search-setup"
      );

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

  async function handleSubmit(event) {
    event.preventDefault();

    if (!resumeFile) {
      showNotification("warning");
      return;
    }

    try {
      // Request 1: Send job search data only.
      // This route will eventually call the JSearch API.
      const jobSearchResponse = await axios.post(
        "http://localhost:5000/api/jobs/search",
        {
        jobTitle,
        location,
        salaryRange,
        workType,
        distance,
        education,
        experienceLevel,
        targetCompany,
        veteranStatus,
        securityClearance,
        extraDetails,
        }
      );

      // Request 2: Send resume file only.
      // This route will eventually store or parse the resume.
      const resumeFormData = new FormData();
      resumeFormData.append("resume", resumeFile);

      const resumeUploadResponse = await axios.post(
        "http://localhost:5000/api/resume/upload",
        resumeFormData
      );

      // Show notification on UI
      jobSearchResponse.data.success && resumeUploadResponse.data.success
        ? showNotification("success")
        : showNotification("error");

      console.log("Resume upload response:", resumeUploadResponse.data);
    } catch (error) {
      console.error("Error submitting job search form:", error);
      showNotification("error");
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

  return (
    <main className="page">
      <Notification type={notification} />
      <section className="setup-page">
        <Navbar/>
        <div className="page-title">
          <h1>{jobSearchSetupPageData.pageTitle}</h1>
        </div>
        <p>Let's get you set up! Please fill out all of the fields below...</p>
        
        <form className="setup-form" onSubmit={handleSubmit}>
          <div className="input-field-container">
            <TextField
              required
              id="job-title"
              label="Job Title"
              placeholder="Job Title"
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
              label="City, State"
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
              id="work-type"
              label="Work Type"
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

            <TextField
              required
              select
              id="distance"
              label="Distance"
              value={distance}
              fullWidth
              margin="normal"
              onChange={(event) => setDistance(event.target.value)}
              sx={getInputStyles(distance)}
              slotProps={{
                select: {
                  MenuProps: getDropdownMenuProps(),
                },
              }}
            >
              <MenuItem sx={dropdownItemStyles} value="5">
                Within 5 miles
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="10">
                Within 10 miles
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="25">
                Within 25 miles
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="50">
                Within 50 miles
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="100">
                Within 100 miles
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="anywhere">
                Anywhere
              </MenuItem>
            </TextField>

            <TextField
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
          </div>

          <div className="input-field-container">
            <TextField
              select
              id="education"
              label="Education"
              value={education}
              fullWidth
              margin="normal"
              onChange={(event) => setEducation(event.target.value)}
              sx={getInputStyles(education)}
              slotProps={{
                select: {
                  MenuProps: getDropdownMenuProps(),
                },
              }}
            >
              <MenuItem sx={dropdownItemStyles} value="none">
                No Degree Required
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="high-school">
                High School Diploma / GED
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="some-college">
                Some College
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="associate">
                Associate Degree
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="bachelors">
                Bachelor's Degree
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="masters">
                Master's Degree
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="doctorate">
                Doctorate / PhD
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="certification">
                Certification / Bootcamp
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="no-preference">
                No Preference
              </MenuItem>
            </TextField>

            <TextField
              select
              id="experience-level"
              label="Experience Level"
              value={experienceLevel}
              fullWidth
              margin="normal"
              onChange={(event) => setExperienceLevel(event.target.value)}
              sx={getInputStyles(experienceLevel)}
              slotProps={{
                select: {
                  MenuProps: getDropdownMenuProps(),
                },
              }}
            >
              <MenuItem sx={dropdownItemStyles} value="intern">
                Intern
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="apprentice">
                Apprentice
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="entry-level">
                Entry Level
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="associate">
                Associate
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="junior">
                Junior
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="mid-level">
                Mid-Level
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="senior">
                Senior
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="staff">
                Staff
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="senior-staff">
                Senior Staff
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="principal">
                Principal
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="lead">
                Lead
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="manager">
                Manager
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="director">
                Director
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="vp">
                VP
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="contractor">
                Contractor
              </MenuItem>
            </TextField>

            <TextField
              select
              id="target-company"
              label="Company"
              value={targetCompany}
              fullWidth
              margin="normal"
              onChange={(event) => setTargetCompany(event.target.value)}
              sx={getInputStyles(targetCompany)}
              slotProps={{
                select: {
                  MenuProps: getDropdownMenuProps(),

                  renderValue: (selectedValue) => {
                    const selectedCompany = targetCompanies.find(
                      (company) => company.value === selectedValue
                    );

                    return selectedCompany ? selectedCompany.label : "";
                  },
                },
              }}
            >
              {/* Build Company Menu */}
              {targetCompanies.map((company) => (
                <MenuItem
                  key={company.value}
                  sx={{
                    ...dropdownItemStyles,
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                  value={company.value}
                >
                  {company.icon && (
                    <img
                      src={company.icon}
                      alt={`${company.label} logo`}
                      style={{
                        width: "25px",
                        height: "25px",
                        objectFit: "contain",
                        flexShrink: 0,
                        display: "block",
                      }}
                    />
                  )}

                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      lineHeight: 1,
                    }}
                  >
                    {company.label}
                  </span>
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              id="veteran-status"
              label="Veteran Status"
              value={veteranStatus}
              fullWidth
              margin="normal"
              onChange={(event) => setVeteranStatus(event.target.value)}
              sx={getInputStyles(veteranStatus)}
              slotProps={{
                select: {
                  MenuProps: getDropdownMenuProps(),
                },
              }}
            >
              <MenuItem sx={dropdownItemStyles} value="prefer-not-to-say">
                Prefer not to say
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="veteran">
                Veteran
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="active-duty">
                Active Duty
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="reservist-national-guard">
                Reservist / National Guard
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="military-spouse">
                Military Spouse
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="not-applicable">
                Not Applicable
              </MenuItem>
            </TextField>

            <TextField
              select
              id="security-clearance"
              label="Security Clearance"
              value={securityClearance}
              fullWidth
              margin="normal"
              onChange={(event) => setSecurityClearance(event.target.value)}
              sx={getInputStyles(securityClearance)}
              slotProps={{
                select: {
                  MenuProps: getDropdownMenuProps(),
                },
              }}
            >
              <MenuItem sx={dropdownItemStyles} value="none">
                None
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="public-trust">
                Public Trust
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="secret">
                Secret
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="top-secret">
                Top Secret
              </MenuItem>

              <MenuItem sx={dropdownItemStyles} value="ts-sci">
                TS/SCI
              </MenuItem>
            </TextField>
          </div>

          <ResumeDropZone onFileSelected={handleResumeSelected} />

          {/* Pass props from the parent component to the child component */}
          <JobSearchTextField
            value={extraDetails}
            onChange={setExtraDetails}
          />

          <Button type="submit" variant="contained" sx={buttonStyles}>
            Find Matching Jobs
          </Button>
        </form>
      </section>
      {/* <Footer/> */}
    </main>
    
  );
}

export default JobSearchSetupPage;