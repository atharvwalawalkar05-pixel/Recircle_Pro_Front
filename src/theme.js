import { createTheme } from '@mui/material/styles';

// Create a premium theme instance with glassmorphism inspiration
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00796B', // Deep Teal as primary color
      light: '#4DB6AC',
      dark: '#004D40',
    },
    secondary: {
      main: '#FFB74D', // Gold accent
      light: '#FFE0B2',
      dark: '#F57C00',
    },
    background: {
      default: '#F8F9FA', // Very light gray for negative space
      paper: '#FFFFFF',   // Pure white for content areas
    },
    text: {
      primary: '#263238', // Dark text for readability
      secondary: '#546E7A', // Sophisticated secondary text
    },
    success: {
      main: '#4CAF50',
    },
    info: {
      main: '#0288D1',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif', // Modern sans-serif
    h1: {
      fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', // Responsive font sizing
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: 'clamp(2rem, 4vw, 2.8rem)',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4, // Smaller radius to match reference's sharper buttons
          padding: '10px 20px',
          fontSize: '1rem',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transform: 'none',
          },
          transition: 'all 0.2s ease-in-out',
        },
        contained: {
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
            backgroundColor: 'rgba(75,107,78,0.04)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#333333',
          boxShadow: 'none',
          borderBottom: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          border: 'none',
          '&:hover': {
            boxShadow: 'none',
            transform: 'none',
          },
          transition: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          border: 'none',
        },
        elevation1: {
          boxShadow: 'none',
        },
        elevation2: {
          boxShadow: 'none',
        },
        elevation3: {
          boxShadow: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4B6B4E',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4B6B4E',
              borderWidth: '1px',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500,
        },
      },
    },
  },
  shape: {
    borderRadius: 4, // Smaller consistent radius
  },
});

export default theme;