import React, { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Welcome Hero Section */}
      <Box sx={{
        background: 'linear-gradient(45deg, #0A0A0A 30%, #1A1A1A 90%)',
        color: 'white',
        py: 4,
        textAlign: 'center',
        borderBottom: '2px solid #00FFFF',
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
      }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" sx={{
            fontWeight: 'bold',
            mb: 2,
            textShadow: '0 0 10px #00FFFF'
          }}>
            Welcome to ReCircle App
          </Typography>
          <Typography variant="h6" sx={{
            mb: 3,
            fontFamily: 'monospace'
          }}>
            A modern platform to recycle, reuse, and reimagine — making the world greener and cleaner.
          </Typography>
          {!user && (
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/register"
              sx={{
                mr: 2,
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}
            >
              Get Started
            </Button>
          )}
        </Container>
      </Box>

      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to="/" 
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
          >
            {/* The icon component is replaced with a simple emoji */}
            ReCircle ♻️
          </Typography>
          <Box>
            {user ? (
              <>
                <Button variant="outlined" color="primary" component={RouterLink} to="/create" sx={{ mr: 1 }}>
                  Create Listing
                </Button>
                <Button variant="outlined" color="primary" component={RouterLink} to="/profile" sx={{ mr: 1 }}>
                  My Listings
                </Button>
                <Button variant="outlined" color="primary" onClick={logoutHandler}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outlined" color="primary" component={RouterLink} to="/login" sx={{ mr: 1 }}>
                  Login
                </Button>
                <Button variant="outlined" color="primary" component={RouterLink} to="/register">
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;