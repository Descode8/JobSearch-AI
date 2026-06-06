import "./Notification.css";

function Notification({ type }) {
    if (!type) {
        return null;
    }

    if (type === "success") {
        return (
            <div className="notification-success">
                Preferences saved successfully!
            </div>
        );
    }

    if (type === "error") {
        return (
            <div className="notification-error">
                Something went wrong. Please try again.
            </div>
        );
    }

    return null;
}

export default Notification;