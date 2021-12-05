import { createTheme } from '@mui/material/styles';
import { red, white } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#fff',
        },
        error: {
            main: red.A400,
        },
    },
});

export default theme;