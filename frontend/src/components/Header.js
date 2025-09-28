import React, { useContext, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  useMediaQuery, 
  useTheme,
  Slide,
  useScrollTrigger
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = (props) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const logoutHandler = () => {
    logout();
    navigate('/login');
    if (drawerOpen) setDrawerOpen(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'NGO\'s', path: '/ngos' },
    { name: 'List Item', path: '/create' },
    { name: 'Profile', path: '/profile' }
  ];

  return (
    <HideOnScroll {...props}>
      <AppBar 
        position="sticky" 
        sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 6 }, py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
                fontWeight: 700,
                fontSize: '1.2rem',
                letterSpacing: '1px',
              }}
            >
              RECIRCLE
            </Typography>
          </Box>

          {isMobile ? (
            <>
              <IconButton 
                edge="end" 
                color="primary" 
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ ml: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer}
                PaperProps={{
                  sx: {
                    width: '70%',
                    maxWidth: '300px',
                    backgroundColor: 'background.paper',
                    borderRadius: '0 0 0 16px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    padding: '1rem'
                  }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                  <IconButton onClick={toggleDrawer}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <List>
                  {navItems.map((item) => (
                    <ListItem 
                      button 
                      component={RouterLink} 
                      to={item.path} 
                      key={item.name}
                      onClick={toggleDrawer}
                      sx={{
                        borderRadius: '8px',
                        mb: 1,
                        '&:hover': {
                          backgroundColor: 'rgba(0, 121, 107, 0.08)'
                        }
                      }}
                    >
                      <ListItemText 
                        primary={item.name} 
                        primaryTypographyProps={{
                          fontWeight: 500,
                          color: 'text.primary'
                        }}
                      />
                    </ListItem>
                  ))}
                  {user ? (
                    <ListItem 
                      button 
                      onClick={logoutHandler}
                      sx={{
                        borderRadius: '8px',
                        backgroundColor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'primary.dark'
                        }
                      }}
                    >
                      <ListItemText 
                        primary="Sign Out" 
                        primaryTypographyProps={{
                          fontWeight: 500,
                          color: 'white'
                        }}
                      />
                    </ListItem>
                  ) : (
                    <ListItem 
                      button 
                      component={RouterLink} 
                      to="/login"
                      onClick={toggleDrawer}
                      sx={{
                        borderRadius: '8px',
                        backgroundColor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'primary.dark'
                        }
                      }}
                    >
                      <ListItemText 
                        primary="Sign In" 
                        primaryTypographyProps={{
                          fontWeight: 500,
                          color: 'white'
                        }}
                      />
                    </ListItem>
                  )}
                </List>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 3 } }}>
              {navItems.map((item) => (
                <Typography
                  key={item.name}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    textDecoration: 'none',
                    color: 'text.primary',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    padding: '0.5rem 0.75rem',
                    borderRadius: '4px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'rgba(0, 121, 107, 0.08)',
                    },
                  }}
                >
                  {item.name}
                </Typography>
              ))}
              {user ? (
                <Box
                  onClick={logoutHandler}
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    py: 1,
                    px: 2.5,
                    borderRadius: '2rem',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0, 121, 107, 0.2)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 12px rgba(0, 121, 107, 0.25)',
                    },
                  }}
                >
                  Sign Out
                </Box>
              ) : (
                <Box
                  component={RouterLink}
                  to="/login"
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    py: 1,
                    px: 2.5,
                    borderRadius: '2rem',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    boxShadow: '0 4px 10px rgba(0, 121, 107, 0.2)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 12px rgba(0, 121, 107, 0.25)',
                    },
                  }}
                >
                  Sign In
                </Box>
              )}
          </Box>
          )}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;