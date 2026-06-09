export function getInputStyles(value) {
    const isFilled = value.trim() !== "";

    const borderColor = "#ffffff";
    const placeholderColor = "var(--text)";
    const focusColor = "white";
    const filledColor = "var(--input-filled)";

    const defaultInputBackground = "var(--social-bg)";
    const filledInputBackground = "#050914";

    return {
        "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            color: "#ffffff",
            backgroundColor: isFilled
                ? filledInputBackground
                : defaultInputBackground,

            "& fieldset": {
                borderColor: isFilled ? filledColor : borderColor,
                borderWidth: isFilled ? "2px" : ".75px",
            },

            "&:hover fieldset": {
                borderColor: isFilled ? filledColor : borderColor,
                borderWidth: "2px",
            },

            "&.Mui-focused fieldset": {
                borderColor: focusColor,
                borderWidth: "2px",
            },
        },

        "& .MuiInputBase-input": {
            color: "#ffffff",
        },

        "& .MuiSelect-select": {
            color: "#ffffff",
        },

        "& .MuiSvgIcon-root": {
            color: isFilled ? filledColor : borderColor,
        },

        "& .MuiOutlinedInput-root.Mui-focused .MuiSvgIcon-root": {
            color: focusColor,
        },

        "& .MuiInputLabel-root": {
            color: isFilled ? filledColor : placeholderColor,
        },

        "& .MuiInputLabel-root.Mui-focused": {
            color: focusColor,
        },

        "& .MuiInputLabel-root.MuiInputLabel-shrink": {
            color: isFilled ? filledColor : focusColor,
            fontSize: "1.1rem",
            fontWeight: 700,
            backgroundColor: "rgba(5, 9, 20, 0.65)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            paddingLeft: "5px",
            paddingRight: "5px",
            borderRadius: "6px",
        },

        "& .MuiInputLabel-root.Mui-focused.MuiInputLabel-shrink": {
            color: focusColor,
            fontSize: "1.1rem",
            fontWeight: 700,
            backgroundColor: "rgba(5, 9, 20, 0.65)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            paddingLeft: "5px",
            paddingRight: "5px",
            borderRadius: "6px",
        },

        "& .MuiInputBase-input::placeholder": {
            color: placeholderColor,
            opacity: 1,
        },
    };
}

export function getDropdownMenuProps() {
    return {
        disableScrollLock: true,

        slotProps: {
            paper: {
                sx: {
                    background: "#050914",
                    border: ".5px solid white",
                    borderRadius: "12px",
                    boxShadow: "0 0 18px rgba(155, 92, 255, 0.35)",
                    overflowY: "auto",
                    overflowX: "hidden",
                    height: "max-content",
                    maxHeight: "250px",
                    color: "#ffffff",
                },
            },
        },
    };
}

export const dropdownItemStyles = {
    color: "#ffffff",
    fontFamily: "var(--sans)",
    fontSize: "0.95rem",
    minHeight: "42px",
    transition:
        "background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease",

    "&:hover": {
        background: "var(--header)",
        color: "#ffffff",
    },

    "&.Mui-selected": {
        background:
            "linear-gradient(var(--social-bg), var(--social-bg)) padding-box",
        color: "#ffffff",
        fontWeight: 700,
    },

    "&.Mui-selected:hover": {
        background:
            "linear-gradient(var(--btn), var(--btn)) padding-box",
        color: "#ffffff",
    },

    "&.Mui-focusVisible": {
        background:
            "linear-gradient(var(--btn), var(--btn)) padding-box",
        color: "#ffffff",
    },
};

export const buttonStyles = {
    mt: 2,
    color: "#ffffff",
    backgroundColor: "var(--btn)",
    border: "2px solid transparent",
    borderRadius: "10px",
    textTransform: "none",
    padding: "8px 25px",
    fontSize: "16px",
    fontWeight: 800,
    transform: "scale(1)",
    transition:
        "background 0.45s ease, box-shadow 0.45s ease, border-color 0.45s ease, transform 0.45s ease",

    "&:hover": {
        background:
            "linear-gradient(oklch(20.8% 0.042 265.755), oklch(27.9% 0.041 260.031)) padding-box, linear-gradient(90deg, #1d4ed8, #c026d3, #e3fc05, #22c55e) border-box",
        backgroundSize: "100% 100%, 300% 300%",
        backgroundPosition: "center, 0% 50%",
        boxShadow: "var(--btn-hover-shadow)",
        animation:
            "movingGradientBorder 3s linear infinite, voiceBreathing 2.4s ease-in-out infinite",
    },

    "@keyframes movingGradientBorder": {
        "0%": {
            backgroundPosition: "center, 0% 50%",
        },

        "50%": {
            backgroundPosition: "center, 100% 50%",
        },

        "100%": {
            backgroundPosition: "center, 0% 50%",
        },
    },

    "@keyframes voiceBreathing": {
        "0%": {
            transform: "scale(1)",
        },

        "50%": {
            transform: "scale(1.01)",
        },

        "100%": {
            transform: "scale(1)",
        },
    },
};