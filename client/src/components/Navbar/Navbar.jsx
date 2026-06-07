import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div
                className="app-name-icon-container"
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

            <h2>JobSearch AI</h2>

            <div className="nav-links">
                <a href="#features">Features</a>
                <a href="#how-it-works">How It Works</a>
            </div>
        </nav>
    );
}

export default Navbar;