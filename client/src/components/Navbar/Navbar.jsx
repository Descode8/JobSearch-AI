import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div
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
            />

            <div className="title-links">
                <h2>JobSearch AI</h2>

                <div className="nav-links">
                    <a href="#features">Features</a>
                    <a href="#how-it-works">How It Works</a>
                </div>
            </div>
            <div
                className="menu-icon-container"
                role="button"
                tabIndex={0}
                aria-label="Menu Items"
                title="See Menu Items"
                // onClick={() => navigate("/")}
            />
        </nav>
    );
}

export default Navbar;