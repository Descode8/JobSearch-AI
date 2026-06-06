export function getInputStyles(value) {
    const isFilled = value.trim() !== "";

    const borderColor = "#ffffff";
    const placeholderColor = "var(--text)";
    const focusColor = "white";
    
    // Default input background when empty
    const defaultInputBackground = "var(--social-bg)";

    // Inner background when filled, same idea as your button hover
    const filledInputBackground = "#050914";

    const filledGradient =
        "linear-gradient(90deg, #1d4ed8, #c026d3, #6b21a8, #22c55e)";

    return {
        "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            color: "#ffffff",
            backgroundColor: defaultInputBackground,

            "& fieldset": {
                borderColor: isFilled ? "transparent" : borderColor,
                borderWidth: isFilled ? "2px" : ".75px",
            },

            "&:hover fieldset": {
                borderColor: isFilled ? "transparent" : borderColor,
                borderWidth: "2px",
            },

            "&.Mui-focused fieldset": {
                borderColor: isFilled ? "transparent" : focusColor,
                borderWidth: "2px",
            },

            ...(isFilled && {
                border: "2px solid transparent",
                background:
                    `linear-gradient(${filledInputBackground}, ${filledInputBackground}) padding-box, ${filledGradient} border-box`,
                boxShadow: "0 0 18px rgba(155, 92, 255, 0.35)",
            }),
        },

        "& .MuiInputBase-input": {
            color: "#ffffff",
        },

        "& .MuiSelect-select": {
            color: "#ffffff",
        },

        "& .MuiSvgIcon-root": {
            color: isFilled ? "#ffffff" : borderColor,
        },

        "& .MuiInputLabel-root": {
            color: isFilled ? "#ffffff" : placeholderColor,
        },

        "& .MuiInputLabel-root.Mui-focused": {
            color: focusColor,
        },

        "& .MuiInputLabel-root.MuiInputLabel-shrink": {
            color: isFilled ? "#ffffff" : focusColor,
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
        slotProps: {
            paper: {
                sx: {
                    background: "linear-gradient(#050914, #050914) padding-box, var(--btn-gradient-border) ",
                    border: ".5px solid white",
                    borderRadius: "12px",
                    boxShadow: "0 0 18px rgba(155, 92, 255, 0.35)",
                    overflow: "auto",
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
        background:
            "linear-gradient(var(--btn), var(--btn)) padding-box",
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
    transform: "translateY(0) scale(1)",
    transition:
        "background 0.45s ease, box-shadow 0.45s ease, border-color 0.45s ease, transform 0.45s ease",

    "&:hover": {
        background:
            "linear-gradient(#050914, #050914) padding-box, var(--btn-gradient-border) border-box",
        boxShadow: "var(--btn-hover-shadow)",
        animation: "voiceBreathing 2.4s ease-in-out infinite",
    },

    "@keyframes voiceBreathing": {
        "0%": {
            transform: "translateY(-1px) scale(1)",
        },

        "50%": {
            transform: "translateY(-1px) scale(1.05)",
        },

        "100%": {
            transform: "translateY(-1px) scale(1)",
        },
    },
};