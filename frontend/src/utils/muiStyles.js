export function getInputStyles(value) {
    const isFilled = value.trim() !== "";
    const borderColor = "#ffffff";
    const placeholderColor = "var(--text)";
    const focusColor = "var(--btn)";
    const filledColor = "var(--input-filled)";

    return {
        "& .MuiOutlinedInput-root": {
        borderRadius: "10px",
        backgroundColor: "var(--social-bg)",

        "& fieldset": {
            borderColor: isFilled ? filledColor : borderColor,
            borderWidth: ".75px",
        },

        "&:hover fieldset": {
            borderColor: isFilled ? filledColor : borderColor,
            borderWidth: "2px",
        },

        "&.Mui-focused fieldset": {
            borderColor: isFilled ? filledColor : focusColor,
            borderWidth: "2px",
        },
        },

        "& .MuiInputBase-input": {
        color: "white",
        },

        "& .MuiSelect-select": {
        color: "white",
        },

        "& .MuiSvgIcon-root": {
        color: isFilled ? filledColor : borderColor,
        },

        "& .MuiInputBase-input::placeholder": {
        color: placeholderColor,
        opacity: 1,
        },

        "& .MuiInputBase-input:focus::placeholder": {
        opacity: 0,
        },

        "& .MuiInputLabel-root": {
        color: isFilled ? filledColor : placeholderColor,
        },

        "& .MuiInputLabel-root.Mui-focused": {
        color: isFilled ? filledColor : focusColor,
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
    width: "100%",
    maxWidth: "fit-content",
    backgroundColor: "var(--btn)",
    borderRadius: "10px",
    textTransform: "none",
    padding: "10px 25px",
    fontSize: "16px",
    fontWeight: 800,
    "&:hover": {
        backgroundColor: "var(--btn-hover)",
    },
};