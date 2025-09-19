import React, { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box, Chip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 6 }, py: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'text.primary',
              fontWeight: 700,
              fontSize: '1.2rem',
              letterSpacing: '1px',
            }}
          >
            RECIRCLE
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 3 } }}>
          <Typography
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'text.primary',
              fontSize: '0.9rem',
              fontWeight: 500,
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            Home
          </Typography>
          <Typography
            component={RouterLink}
            to="/about" // Adapt to your routes; create if needed
            sx={{
              textDecoration: 'none',
              color: 'text.primary',
              fontSize: '0.9rem',
              fontWeight: 500,
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            About
          </Typography>
          <Typography
            component={RouterLink}
            to="/contact" // Adapt to your routes
            sx={{
              textDecoration: 'none',
              color: 'text.primary',
              fontSize: '0.9rem',
              fontWeight: 500,
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            Contact
          </Typography>
          <Typography
            component={RouterLink}
            to="/faq" // Adapt to your routes
            sx={{
              textDecoration: 'none',
              color: 'text.primary',
              fontSize: '0.9rem',
              fontWeight: 500,
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            FAQ
          </Typography>
          {user ? (
            <>
              <Typography
                component={RouterLink}
                to="/create"
                sx={{
                  textDecoration: 'none',
                  color: 'text.primary',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                List Item
              </Typography>
              <Typography
                component={RouterLink}
                to="/profile"
                sx={{
                  textDecoration: 'none',
                  color: 'text.primary',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                Profile
              </Typography>
              <Typography
                onClick={logoutHandler}
                sx={{
                  cursor: 'pointer',
                  color: 'text.primary',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                Sign Out
              </Typography>
            </>
          ) : (
            <>
              <Typography
                component={RouterLink}
                to="/login"
                sx={{
                  textDecoration: 'none',
                  color: 'text.primary',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                Sign In
              </Typography>
              <Typography
                component={RouterLink}
                to="/register"
                sx={{
                  textDecoration: 'none',
                  color: 'text.primary',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                Join Now
              </Typography>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;