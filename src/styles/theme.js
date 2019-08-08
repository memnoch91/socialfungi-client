import loginSignUp from './loginAndSignupStyleObject';
import profileStyles from './profileStyleObject'

export default {
    palette: {
        primary: {
            light: "#7f7b82",
            main: "#d8ccc0",
            dark: "#444554",
            contrastText: "#172121",
        },
        secondary: {
            light: "#f1fffa",
            main: "#093824",
            dark: "#568259",
            contrastText: "#464e47",
        }
    },
    overrides: {
        MuiTooltip: {
            tooltip: {
                fontSize: "0.8em",
            }
        }
    },
    typography: {
        useNextVariants: true
    },
    ...loginSignUp,
    ...profileStyles
}