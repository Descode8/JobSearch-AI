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
        },

        "& .MuiInputLabel-root.Mui-focused.MuiInputLabel-shrink": {
            color: focusColor,
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
                    backgroundColor: "var(--text)",
                    border: ".5px solid var(--btn)",
                    borderRadius: "12px",
                    boxShadow: "0 18px 40px rgba(0, 0, 0, 0.45)",
                    overflow: "auto",
                    height: "max-content",
                    maxHeight: "250px",
                },
            },
        },
    };
}

export const dropdownItemStyles = {
    color: "white",
    fontFamily: "var(--sans)",
    fontSize: "0.95rem",

    "&:hover": {
        backgroundColor: "var(--btn-hover)",
        color: "#ffffff",
    },

    "&.Mui-selected": {
        backgroundColor: "rgba(39, 174, 96, 0.25)",
        color: "var(--input-filled)",
        fontWeight: 700,
    },

    "&.Mui-selected:hover": {
        backgroundColor: "rgba(39, 174, 96, 0.35)",
    },
};

export const buttonStyles = {
    mt: 2,
    color: "#ffffff",
    backgroundColor: "var(--btn)",
    border: "2px solid transparent",
    borderRadius: "10px",
    textTransform: "none",
    padding: "10px 25px",
    fontSize: "16px",
    fontWeight: 800,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",

    "&:hover": {
        background:
            "linear-gradient(#050914, #050914) padding-box, var(--btn-gradient-border) border-box",
        boxShadow: "var(--btn-hover-shadow)",
        transform: "translateY(-1px)",
    },
};