import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'light', // Classic light mode
    primary: {
      main: '#2E3B55', // Classic navy blue
    },
    secondary: {
      main: '#6B7B8C', // Classic gray-blue
    },
    background: {
      default: '#F5F5F5', // Light gray background
      paper: '#FFFFFF',   // White for components
    },
    text: {
      primary: '#2E3B55',
      secondary: '#6B7B8C',
    },
  },
  typography: {
    fontFamily: '"Times New Roman", "Georgia", serif', // Classic serif font
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
          borderRadius: 0, // Square corners for classic look
          textTransform: 'none', // Normal case
          border: '2px solid', // Add border for 2D effect
          boxShadow: 'none', // Remove shadows
          '&:hover': {
            boxShadow: 'none', // No hover shadow
            backgroundColor: 'rgba(46, 59, 85, 0.1)', // Subtle hover
          },
        },
        contained: {
          border: '2px solid transparent',
          '&:hover': {
            backgroundColor: '#2E3B55',
            borderColor: '#2E3B55',
          },
        },
        outlined: {
          borderWidth: '2px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none', // Remove shadow for flat look
          borderBottom: '2px solid #2E3B55',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none', // Flat cards
          border: '1px solid #E0E0E0',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none', // Flat paper
          border: '1px solid #E0E0E0',
        },
      },
    },
  },
});

export default theme;