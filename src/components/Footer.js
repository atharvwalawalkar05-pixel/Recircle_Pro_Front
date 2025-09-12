import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{
      textAlign: 'center',
      py: 3,
      mt: 5,
      borderTop: '2px solid #00FFFF',
      backgroundColor: '#1A1A1A',
      boxShadow: '0 0 10px rgba(0, 255, 255, 0.2)'
    }}>
      <Container maxWidth="md">
        <Typography variant="body1" sx={{
          color: '#B0B0B0',
          fontFamily: 'monospace'
        }}>
          Copyright &copy; ReCircle {new Date().getFullYear()}
        </Typography>
        <Typography variant="body2" sx={{
          color: '#808080',
          mt: 1,
          fontFamily: 'monospace'
        }}>
          Making the world greener and cleaner, one recycled item at a time.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;