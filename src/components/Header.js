import React, { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate('/login');
  };

  return (
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
  );
};

export default Header;