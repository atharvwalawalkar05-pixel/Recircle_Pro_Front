import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark', // This is the key to enable dark mode
    primary: {
      main: '#5E35B1', // A modern purple color
    },
    secondary: {
      main: '#03A9F4', // A bright blue for accents
    },
    background: {
      default: '#121212', // A standard dark background
      paper: '#1E1E1E',   // The background for components like Cards and Paper
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#BDBDBD',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    // Example of overriding a component's default style
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none', // Buttons will use normal case instead of UPPERCASE
        },
      },
    },
  },
});

export default theme;