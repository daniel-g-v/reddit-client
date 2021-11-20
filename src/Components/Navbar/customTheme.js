import { createTheme } from "@mui/material";
import { indigo } from "@mui/material/colors";



const customTheme = createTheme({
    palette: {
        primary: {
            main: '#f2f2f2'
        },
        secondary: {
            main: indigo[800]
        }
    }
});

export default customTheme;