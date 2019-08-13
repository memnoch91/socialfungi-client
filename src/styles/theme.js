import loginSignUp from './loginAndSignupStyleObject';
import profileStyles from './profileStyleObject';
import postSpore from './postSopre';
import sporeDialogStyles from './sporeDialogStyles';

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
    verticalSeparator: {
        border: 'none',
        margin: 4
    },
    horizontalSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    },
    ...loginSignUp,
    ...profileStyles,
    ...postSpore,
    ...sporeDialogStyles
}