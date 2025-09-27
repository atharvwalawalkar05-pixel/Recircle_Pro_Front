import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const AboutScreen = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        About ReCircle
      </Typography>
      <Typography variant="body1" paragraph>
        ReCircle is a platform dedicated to promoting recycling and reuse of items to reduce waste and support sustainable living. Our mission is to connect communities and facilitate the exchange of goods that can be given a second life.
      </Typography>
      <Typography variant="body1" paragraph>
        Founded in [Year], we aim to make recycling easy and accessible for everyone. Join us in making a positive impact on the environment!
      </Typography>
      {/* Add more content or sections as needed */}
    </Container>
  );
};

export default AboutScreen;
