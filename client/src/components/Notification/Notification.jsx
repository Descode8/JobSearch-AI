import "./Notification.css";

function Notification({ type }) {
    if (!type) {
        return null;
    }

    if (type === "success") {
        return (
            <div className="notification-success">
                Job search started successfully!
            </div>
        );
    }

    if (type === "error") {
        return (
            <div className="notification-error">
                Job search failed. Please try again.
            </div>
        );
    }

    if (type === "warning") {
        return (
            <div className="notification-warning">
                Please upload your resume first.
            </div>
        );
    }

    return null;
}

export default Notification;