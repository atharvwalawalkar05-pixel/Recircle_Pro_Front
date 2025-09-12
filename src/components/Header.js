import React, { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box, Chip } from '@mui/material';
import RecyclingIcon from '@mui/icons-material/Recycling';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <RecyclingIcon sx={{ color: 'primary.main', fontSize: '2rem' }} />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'text.primary',
              fontWeight: 700,
              fontSize: '1.5rem',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            ReCircle
          </Typography>
          <Chip
            label="♻️"
            size="small"
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              fontSize: '0.75rem',
              height: '20px',
              '& .MuiChip-label': {
                px: 0.5,
              },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {user ? (
            <>
              <Button
                variant="outlined"
                color="primary"
                component={RouterLink}
                to="/create"
                sx={{ fontWeight: 500 }}
              >
                List Item
              </Button>
              <Button
                variant="outlined"
                color="primary"
                component={RouterLink}
                to="/profile"
                sx={{ fontWeight: 500 }}
              >
                My Items
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={logoutHandler}
                sx={{ fontWeight: 500 }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="text"
                color="primary"
                component={RouterLink}
                to="/login"
                sx={{ fontWeight: 500 }}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/register"
                sx={{ fontWeight: 500 }}
              >
                Join Now
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;