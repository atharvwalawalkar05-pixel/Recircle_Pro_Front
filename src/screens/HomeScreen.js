import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';
import { Box, Typography, CircularProgress, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Pagination, Container, Paper, Card, CardContent, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RecyclingIcon from '@mui/icons-material/Recycling';
import EcoIcon from '@mui/icons-material/Eco';
import GroupIcon from '@mui/icons-material/Group';

const HomeScreen = () => {
  const [items, setItems] = useState([]); // Ensure initial state is an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State for search, filter, and pagination
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const categories = ['Electronics', 'Furniture', 'Clothing', 'Books', 'Scrap Metal', 'Other'];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/items`, {
          params: {
            keyword: keyword,
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
    setPage(1); // Reset to first page on a new search
  };
  
  const handleCategoryChange = (e) => {
    setPage(1); // Reset to first page on a new filter
    setCategory(e.target.value);
  }

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 50%, #81C784 100%)',
          color: 'white',
          py: { xs: 6, md: 8 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Give Items a Second Life
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              opacity: 0.9,
              fontWeight: 400,
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Join our community in reducing waste and promoting sustainable living
            through reuse and recycling.
          </Typography>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mt: 4, mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                  <RecyclingIcon sx={{ fontSize: '2rem', mb: 1 }} />
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    10K+
                  </Typography>
                  <Typography variant="body2">
                    Items Recycled
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                  <GroupIcon sx={{ fontSize: '2rem', mb: 1 }} />
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    2K+
                  </Typography>
                  <Typography variant="body2">
                    Active Members
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                  <EcoIcon sx={{ fontSize: '2rem', mb: 1 }} />
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    50T
                  </Typography>
                  <Typography variant="body2">
                    CO₂ Saved
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{
            textAlign: 'center',
            mb: 4,
            fontWeight: 600,
            color: 'text.primary'
          }}
        >
          Latest Listings
        </Typography>

        {/* Search and Filter Section */}
        <Paper
          elevation={2}
          sx={{
            p: 3,
            mb: 4,
            backgroundColor: 'background.paper',
            borderRadius: 2,
          }}
        >
          <Box
            component="form"
            onSubmit={searchHandler}
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <TextField
              sx={{ flex: 1, minWidth: '200px' }}
              variant="outlined"
              label="Search items..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={handleCategoryChange}
              >
                <MenuItem value="">
                  <em>All Categories</em>
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ px: 4 }}
            >
              Search
            </Button>
          </Box>
        </Paper>

        {/* Items Grid */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        ) : error ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography color="error" variant="h6">
              {error}
            </Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {items && items.length === 0 ? (
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 6,
                      textAlign: 'center',
                      backgroundColor: 'background.paper',
                    }}
                  >
                    <RecyclingIcon sx={{ fontSize: '4rem', color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>
                      No items found
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                      Try adjusting your search or browse all available items.
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => {
                        setKeyword('');
                        setCategory('');
                      }}
                    >
                      Browse All Items
                    </Button>
                  </Paper>
                </Grid>
              ) : (
                items &&
                items.map((item) => (
                  <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
                    <ItemCard item={item} />
                  </Grid>
                ))
              )}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              {pages > 1 && (
                <Pagination count={pages} page={page} onChange={handlePageChange} color="primary" />
              )}
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default HomeScreen;