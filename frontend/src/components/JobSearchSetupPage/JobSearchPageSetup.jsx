import { useEffect, useState } from "react";
import axios from "axios";
import "./JobSearchPageSetup.css";

function JobSearchSetupPage() {
  const [jobSearchSetupPageData, setJobSearchSetupPageData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <main className="page">
      <section className="setup-page">
        <div className="page-title">
          <h1>{jobSearchSetupPageData.pageTitle}</h1>
        </div>

        <p>Tell JobSearch AI what kind of job you are looking for.</p>

        <form className="setup-form">
          <div className="input-field-container">
            <input type="text" placeholder="Job Title, Keywords, or Company" />

            <input type="text" placeholder='City, State, Zip-Code or "Remote"' />

            <select>
              <option value="">Select work type</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">On-site</option>
            </select>
          </div>
          {/* <button type="submit" className="primary-button">
            Continue
          </button> */}
        </form>
      </section>
    </main>
  );
}

export default JobSearchSetupPage;