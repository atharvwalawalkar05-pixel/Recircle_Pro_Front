import React from 'react';
import { Box, Typography, Container, Grid, Link, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#2C3E50',
        color: 'white',
        py: 4,
        mt: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <HomeIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                ReCircle
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, color: '#BDC3C7' }}>
              Making the world greener, one recycled item at a time. Join our community
              in reducing waste and promoting sustainable living.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <HomeIcon sx={{ color: '#4CAF50' }} />
              <HomeIcon sx={{ color: '#4CAF50' }} />
              <HomeIcon sx={{ color: '#4CAF50' }} />
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Browse Items
              </Link>
              <Link href="/create" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                List an Item
              </Link>
              <Link href="/profile" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                My Account
              </Link>
              <Link href="/register" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Join Community
              </Link>
            </Box>
          </Grid>

          {/* Environmental Impact */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Our Impact
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" sx={{ color: '#BDC3C7' }}>
                • Reducing landfill waste
              </Typography>
              <Typography variant="body2" sx={{ color: '#BDC3C7' }}>
                • Promoting circular economy
              </Typography>
              <Typography variant="body2" sx={{ color: '#BDC3C7' }}>
                • Building sustainable communities
              </Typography>
              <Typography variant="body2" sx={{ color: '#BDC3C7' }}>
                • Supporting eco-friendly practices
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, backgroundColor: '#BDC3C7' }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#BDC3C7' }}>
            © {new Date().getFullYear()} ReCircle. All rights reserved.
            <br />
            <Box component="span" sx={{ color: 'primary.main', fontWeight: 500 }}>
              Together for a Greener Tomorrow 🌱
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;