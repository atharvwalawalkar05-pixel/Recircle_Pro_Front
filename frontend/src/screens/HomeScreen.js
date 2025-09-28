import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  Pagination,
  Container,
  Paper,
  useTheme,
  useMediaQuery,
  Stack,
  Fab,
  Zoom,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AddIcon from '@mui/icons-material/Add';

const HomeScreen = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [items, setItems] = useState([]); // Ensure initial state is an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State for search, filter, and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const categories = ['Electronics', 'Furniture', 'Clothing', 'Books', 'Scrap Metal', 'Other'];

  // Hero section render function
  const renderHeroSection = () => {
    return (
      <Box
        sx={{
          position: 'relative',
          height: { xs: '600px', md: '700px' },
          width: '100%',
          overflow: 'hidden',
          backgroundImage: 'url(/images/hero-bg.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mb: 8,
        }}
      >
        {/* Glassmorphism overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(10px)',
            zIndex: 1,
          }}
        />
        
        {/* Content container */}
        <Container maxWidth="lg" sx={{ height: '100%', position: 'relative', zIndex: 2 }}>
          <Grid 
            container 
            sx={{ 
              height: '100%', 
              alignItems: 'center',
              justifyContent: { xs: 'center', md: 'flex-start' }
            }}
          >
            <Grid item xs={12} md={7} lg={6}>
              <Box
                sx={{
                  p: { xs: 3, md: 5 },
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                <Typography 
                  variant="h1" 
                  sx={{ 
                    color: 'white',
                    fontWeight: 900,
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                    mb: 2,
                    textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                  }}
                >
                  RECIRCLE RECYCLING
                </Typography>
                
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'white',
                    fontWeight: 500,
                    mb: 3,
                    opacity: 0.9
                  }}
                >
                  Sustainable Solutions for a Circular Economy
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'white',
                    mb: 4,
                    opacity: 0.8,
                    maxWidth: { md: '90%' }
                  }}
                >
                  Join our community to give your unused items a second life. Help reduce waste and connect with people who can use what you no longer need.
                </Typography>
                
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2}
                  sx={{ 
                    justifyContent: { xs: 'center', md: 'flex-start' } 
                  }}
                >
                  <Button
                    component={RouterLink}
                    to="/create"
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: theme.palette.secondary.main,
                      color: 'text.primary',
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      borderRadius: '30px',
                      boxShadow: '0 4px 14px rgba(255, 183, 77, 0.4)',
                      '&:hover': {
                        bgcolor: theme.palette.secondary.dark,
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(255, 183, 77, 0.5)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Get Started
                  </Button>
                  
                  <Button
                    component={RouterLink}
                    to="/about"
                    variant="outlined"
                    size="large"
                    sx={{
                      color: 'white',
                      borderColor: 'white',
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      borderRadius: '30px',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Learn More
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/items`, {
          params: {
            keyword: keyword, // This is the "committed" search keyword
            category: category,
            page: page,
          }
        });
        // Correctly set items from the response object
        setItems(data.items || []);
        setPages(data.pages || 1);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch items.');
        setLoading(false);
      }
    };
    fetchItems();
  }, [keyword, category, page]); // Re-fetch whenever keyword, category, or page changes

  const searchHandler = (e) => {
    e.preventDefault();
    setKeyword(searchTerm);
    setPage(1); 
  };
  
  const handleCategoryChange = (e) => {
    setPage(1); // Reset to first page on a new filter
    setCategory(e.target.value);
  }

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Feature cards section
  const renderFeatureCards = () => {
    const features = [
      {
        icon: <PostAddIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
        title: 'List Your Items',
        description: 'Photograph and list items you no longer need. Provide details about condition and availability.',
        action: 'List Now',
        link: '/create'
      },
      {
        icon: <ConnectWithoutContactIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
        title: 'Connect',
        description: 'Connect with interested parties who can use your items. Arrange pickup or delivery details.',
        action: 'Browse Items',
        link: '/#items'
      },
      {
        icon: <AutorenewIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
        title: 'Reduce Waste',
        description: 'Help reduce landfill waste by giving items a second life. Track your environmental impact.',
        action: 'Learn More',
        link: '/about'
      }
    ];

    return (
      <Box sx={{ py: 8, mb: 6 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            align="center" 
            sx={{ 
              mb: 6, 
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            How It Works
          </Typography>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    height: '100%',
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,249,250,0.9) 100%)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      mb: 2, 
                      p: 2,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 121, 107, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {feature.icon}
                  </Box>
                  
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    sx={{ 
                      mb: 2, 
                      fontWeight: 600,
                      color: 'primary.main'
                    }}
                  >
                    {feature.title}
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mb: 4,
                      flexGrow: 1
                    }}
                  >
                    {feature.description}
                  </Typography>
                  
                  <Button
                    component={RouterLink}
                    to={feature.link}
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: '30px',
                      px: 3,
                      py: 1,
                      fontWeight: 500,
                      boxShadow: '0 4px 10px rgba(0, 121, 107, 0.2)',
                      '&:hover': {
                        boxShadow: '0 6px 14px rgba(0, 121, 107, 0.3)',
                      }
                    }}
                  >
                    {feature.action}
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  };

  return (
    <>
      {renderHeroSection()}
      {renderFeatureCards()}
      
      {/* Floating Action Button */}
      <Zoom in={true} style={{ transitionDelay: '500ms' }}>
        <Tooltip title="Add New Item" placement="left">
          <Fab 
            color="secondary" 
            aria-label="add" 
            component={RouterLink} 
            to="/create"
            sx={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              boxShadow: '0 8px 16px rgba(255,183,77,0.3)',
              '&:hover': {
                boxShadow: '0 12px 24px rgba(255,183,77,0.4)',
              }
            }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Zoom>
      
      {/* MAIN ITEMS AND CONTENT CONTAINER START */}
      <Container maxWidth="xl" id="items" sx={{ py: 4 }}>
        <Typography 
          variant="h2" 
          align="center" 
          sx={{ 
            mb: 6, 
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          Available Items
        </Typography>

        {/* We Made Section */}
        <Box sx={{ backgroundColor: 'primary.main', py: 6, textAlign: 'center' }}>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              sx={{ color: '#FFFFFF', mb: 4, textTransform: 'uppercase', fontWeight: 700 }}
            >
              We Promote Reuse & Creative Recycling
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={4}>
                <Box
                  component="img"
                  src="https://picsum.photos/400/300?random=2" // Working placeholder; replace with your actual image, e.g., "/images/concept1.png"
                  alt="Concept 1"
                  sx={{ width: '100%', height: 'auto', borderRadius: 0 }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  component="img"
                  src="https://picsum.photos/400/300?random=3" // Working placeholder; replace with your actual image, e.g., "/images/concept2.png"
                  alt="Concept 2"
                  sx={{ width: '100%', height: 'auto', borderRadius: 0 }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  component="img"
                  src="https://picsum.photos/400/300?random=4" // Working placeholder; replace with your actual image, e.g., "/images/concept3.png"
                  alt="Concept 3"
                  sx={{ width: '100%', height: 'auto', borderRadius: 0 }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Services Section */}
        <Box sx={{ py: 6, textAlign: 'center' }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <Box sx={{ mb: 2 }}>
                  <PostAddIcon sx={{ fontSize: 50, color: 'secondary.main' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Free Listing</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ mb: 2 }}>
                  <ConnectWithoutContactIcon sx={{ fontSize: 50, color: 'secondary.main' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Community Connection</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ mb: 2 }}>
                  <AutorenewIcon sx={{ fontSize: 50, color: 'secondary.main' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Sustainable Impact</Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Provide Section with Listings */}
        <Box sx={{ backgroundColor: '#FFFFFF', py: 6 }}>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              sx={{ textAlign: 'center', mb: 4, textTransform: 'uppercase', fontWeight: 700 }}
            >
              We Provide You The Best Recycling Options
            </Typography>
            <Typography sx={{ textAlign: 'center', mb: 6, color: 'text.secondary' }}>
              Browse our latest listings and give items a second life.
            </Typography>

            {/* Integrated Search and Filters */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
              <Paper
                component="form"
                onSubmit={searchHandler}
                sx={{
                  p: '4px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  width: { xs: '100%', sm: 300 },
                  borderRadius: 20,
                }}
              >
                <TextField
                  fullWidth
                  variant="standard"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
                <Button type="submit" sx={{ minWidth: 'auto' }}>
                  <SearchIcon />
                </Button>
              </Paper>
              <FormControl sx={{ minWidth: 150 }}>
                <Select
                  value={category}
                  onChange={handleCategoryChange}
                  displayEmpty
                  size="small"
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Items Grid */}
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress color="primary" size={60} thickness={4} />
              </Box>
            ) : error ? (
              <Typography color="error" align="center" sx={{ 
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                p: 2
              }}>{error}</Typography>
            ) : (
              <>
                <Grid container spacing={3}>
                  {items.length === 0 ? (
                    <Grid item xs={12}>
                      <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
                        No items found. Try adjusting your search.
                      </Typography>
                    </Grid>
                  ) : (
                    items.map((item) => (
                      <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
                        <ItemCard item={item} sx={{
                          height: '100%',
                          borderRadius: '16px',
                          overflow: 'hidden',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 12px 30px rgba(0,0,0,0.12)'
                          }
                        }} />
                      </Grid>
                    ))
                  )}
                </Grid>
                {pages > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 2 }}>
                    <Pagination 
                      count={pages} 
                      page={page} 
                      onChange={handlePageChange} 
                      color="primary"
                      size="large"
                      sx={{
                        '& .MuiPaginationItem-root': {
                          borderRadius: '12px',
                          mx: 0.5,
                          fontWeight: 500,
                          '&.Mui-selected': {
                            boxShadow: '0 4px 10px rgba(0, 121, 107, 0.2)'
                          }
                        }
                      }}
                    />
                  </Box>
                )}
              </>
            )}

            {/* Additional Images */}
            <Grid container spacing={2} sx={{ mt: 6 }}>
              <Grid item xs={12} md={4}>
                <Box
                  component="img"
                  src="https://picsum.photos/400/300?random=5" // Working placeholder; replace with your actual image, e.g., "/images/recycling1.png"
                  alt="Image 1"
                  sx={{ width: '100%', height: 'auto' }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  component="img"
                  src="https://picsum.photos/400/300?random=6" // Working placeholder; replace with your actual image, e.g., "/images/recycling2.png"
                  alt="Image 2"
                  sx={{ width: '100%', height: 'auto' }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  component="img"
                  src="https://picsum.photos/400/300?random=7" // Working placeholder; replace with your actual image, e.g., "/images/recycling3.png"
                  alt="Image 3"
                  sx={{ width: '100%', height: 'auto' }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Container> 
      {/* MAIN ITEMS AND CONTENT CONTAINER END */}

      {/* Footer Note (Moved out to be a sibling of the main content container) */}
      <Box sx={{ textAlign: 'center', py: 2, backgroundColor: '#FFFFFF' }}>
        <Typography variant="body2" color="text.secondary">
          © 2023 ReCircle
        </Typography>
      </Box>
    </>
  );
} 

export default HomeScreen;