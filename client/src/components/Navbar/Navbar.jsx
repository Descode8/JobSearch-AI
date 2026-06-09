import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const JobSearchAI_logo = "/images/icons/job-search-ai-logo.svg";
function Navbar() {
    const navigate = useNavigate();

    function goToSection(sectionId) {
        navigate("/");

        setTimeout(() => {
            const section = document.getElementById(sectionId);

            if (section) {
                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        }, 100);
    }

    return (
        <nav className="navbar">
            {/* <div
                className="app-icon-container"
                role="button"
                tabIndex={0}
                aria-label="Go to home page"
                title="Go home"
                onClick={() => navigate("/")}
                onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        navigate("/");
                    }
                }}
            /> */}

            <div className="title-links">
                <img
                    className="job-search-logo"
                    src={JobSearchAI_logo}
                    alt="Job Search AI Logo"
                    role="button"
                    tabIndex={0}
                    aria-label="Go to home page"
                    title="Go home"
                    onClick={() => navigate("/")}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                            navigate("/");
                        }
                    }}
                />

                <div className="nav-links">
                    <a
                        href="#features"
                        onClick={(event) => {
                            event.preventDefault();
                            goToSection("features");
                        }}
                    >
                        Features
                    </a>

                    <a
                        href="#how-it-works"
                        onClick={(event) => {
                            event.preventDefault();
                            goToSection("how-it-works");
                        }}
                    >
                        How It Works
                    </a>
                </div>
            </div>

            <div
                className="menu-icon-container"
                role="button"
                tabIndex={0}
                aria-label="Menu Items"
                title="See Menu Items"
            />
        </nav>
    );
}

export default Navbar;