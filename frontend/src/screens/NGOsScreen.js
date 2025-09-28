import React from 'react';
import { 
  Typography, 
  Container, 
  Box, 
  Card, 
  CardContent, 
  CardMedia, 
  Grid,
  Button
} from '@mui/material';

const NGOsScreen = () => {
  // Sample NGO data
  const ngos = [
    {
      id: 1,
      name: 'Green Earth Foundation',
      description: 'Working to promote sustainable recycling practices and environmental conservation across communities.',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      website: 'https://example.org/green-earth'
    },
    {
      id: 2,
      name: 'Recycle Together',
      description: 'Connecting recyclers with local communities to maximize the impact of recycling efforts.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      website: 'https://example.org/recycle-together'
    },
    {
      id: 3,
      name: 'Clean Future Initiative',
      description: 'Dedicated to creating a cleaner future through innovative recycling programs and education.',
      image: 'https://images.unsplash.com/photo-1528190336454-13cd56b45b5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      website: 'https://example.org/clean-future'
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
          Partner NGO Organizations
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ mb: 4, textAlign: 'center' }}>
          ReCircle partners with these dedicated non-profit organizations to maximize the impact of recycling efforts.
          Together, we're building a more sustainable future through collaborative initiatives and community engagement.
        </Typography>

        <Grid container spacing={4}>
          {ngos.map((ngo) => (
            <Grid item xs={12} md={4} key={ngo.id}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                }
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={ngo.image}
                  alt={ngo.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                    {ngo.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {ngo.description}
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    href={ngo.website} 
                    target="_blank"
                    sx={{ mt: 2 }}
                  >
                    Visit Website
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Want to Partner With Us?
          </Typography>
          <Typography variant="body1" paragraph>
            If your organization is focused on recycling and sustainability, we'd love to explore partnership opportunities.
          </Typography>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large"
            sx={{ mt: 2 }}
          >
            Contact for Partnership
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NGOsScreen;