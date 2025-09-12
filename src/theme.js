import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark', // Dark techno theme
    primary: {
      main: '#00FFFF', // Cyan neon
    },
    secondary: {
      main: '#FF00FF', // Magenta neon
    },
    background: {
      default: '#0A0A0A', // Deep black
      paper: '#1A1A1A',   // Dark gray for components
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
  },
  typography: {
    fontFamily: '"Courier New", "Monaco", monospace', // Techno monospace font
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Sharp corners for techno look
          textTransform: 'uppercase', // Techno style
          border: '2px solid #00FFFF', // Cyan border
          boxShadow: '0 0 10px #00FFFF', // Neon glow
          '&:hover': {
            boxShadow: '0 0 20px #00FFFF', // Brighter glow on hover
            backgroundColor: 'rgba(0, 255, 255, 0.1)',
          },
        },
        contained: {
          backgroundColor: '#00FFFF',
          color: '#0A0A0A',
          '&:hover': {
            backgroundColor: '#00CCCC',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderColor: '#FF00FF',
            boxShadow: '0 0 20px #FF00FF',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1A1A',
          boxShadow: '0 0 10px #00FFFF',
          borderBottom: '2px solid #00FFFF',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1A1A',
          border: '1px solid #00FFFF',
          boxShadow: '0 0 5px rgba(0, 255, 255, 0.3)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1A1A',
          border: '1px solid #333333',
        },
      },
    },
  },
});

export default theme;