import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Container,
  Paper,
  Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const HomeScreen = () => {
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

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(46,125,50,1) 0%, rgba(46,125,50,0.92) 35%, rgba(25,118,210,0.9) 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Decorative blobs */}
        <Box sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(800px 400px at 10% 20%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%), radial-gradient(600px 300px at 90% 10%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)'
        }} />
        <Container maxWidth="md" sx={{ position: 'relative' }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{ fontWeight: 800, letterSpacing: '-0.5px', mb: 2, fontSize: { xs: '2.4rem', md: '3.4rem' } }}
          >
            Give Items a Second Life
          </Typography>
          <Typography
            variant="h5"
            sx={{ mb: 4, opacity: 0.95, fontWeight: 300, maxWidth: '760px', mx: 'auto' }}
          >
            Join our community in reducing waste and promoting sustainable living
            through reuse and recycling.
          </Typography>

          {/* Search Bar */}
          <Paper
            component="form"
            onSubmit={searchHandler}
            elevation={6}
            sx={{
              p: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              maxWidth: 720,
              mx: 'auto',
              mt: 2,
              borderRadius: 4,
              backdropFilter: 'blur(4px)',
            }}
          >
            <TextField
              fullWidth
              variant="standard"
              placeholder="Search for electronics, furniture, books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                disableUnderline: true,
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.disabled' }} />,
              }}
            />
            <Button type="submit" variant="contained" color="secondary" sx={{ ml: 1, px: 3, fontWeight: 600 }}>
              Search
            </Button>
          </Paper>

          {/* Quick filter chips */}
          <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1.2, justifyContent: 'center' }}>
            <Chip
              label="All"
              onClick={() => { setCategory(''); setPage(1); }}
              color={category === '' ? 'default' : 'default'}
              variant={category === '' ? 'filled' : 'outlined'}
              sx={{ bgcolor: category === '' ? 'rgba(255,255,255,0.2)' : 'transparent', color: 'white', borderColor: 'rgba(255,255,255,0.6)' }}
            />
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                onClick={() => { setCategory(cat); setPage(1); }}
                variant={category === cat ? 'filled' : 'outlined'}
                sx={{ bgcolor: category === cat ? 'rgba(255,255,255,0.2)' : 'transparent', color: 'white', borderColor: 'rgba(255,255,255,0.6)' }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, mb: 6 }}>
          How It Works
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center', borderRadius: 3 }}>
              <Box sx={{
                mx: 'auto', mb: 2, width: 64, height: 64, borderRadius: '50%', display: 'grid', placeItems: 'center',
                backgroundColor: 'rgba(46,125,50,0.1)', color: 'primary.main'
              }}>
                <PostAddIcon sx={{ fontSize: 34 }} />
              </Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>1. Post an Item</Typography>
              <Typography color="text.secondary">Easily list your unwanted items or scraps for free. Just add a title, description, and photos.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center', borderRadius: 3 }}>
              <Box sx={{
                mx: 'auto', mb: 2, width: 64, height: 64, borderRadius: '50%', display: 'grid', placeItems: 'center',
                backgroundColor: 'rgba(25,118,210,0.1)', color: 'secondary.main'
              }}>
                <ConnectWithoutContactIcon sx={{ fontSize: 34 }} />
              </Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>2. Connect with Others</Typography>
              <Typography color="text.secondary">Browse listings and connect with people in your community to arrange a pickup.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center', borderRadius: 3 }}>
              <Box sx={{
                mx: 'auto', mb: 2, width: 64, height: 64, borderRadius: '50%', display: 'grid', placeItems: 'center',
                backgroundColor: 'rgba(76,175,80,0.1)', color: 'success.main'
              }}>
                <AutorenewIcon sx={{ fontSize: 34 }} />
              </Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>3. Give it a New Life</Typography>
              <Typography color="text.secondary">Help reduce waste by giving items a second chance, contributing to a more sustainable planet.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Listings Section */}
      <Box sx={{ backgroundColor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          {/* Listings Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, gap: 2, flexWrap: 'wrap' }}>
            <Box>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700, lineHeight: 1 }}>
                Latest Listings
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Explore items shared by the community
              </Typography>
            </Box>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 220, backgroundColor: 'background.paper' }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={handleCategoryChange}
              >
                <MenuItem value="">
                  All Categories
                </MenuItem>
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
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress size={60} />
            </Box>
          ) : error ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography color="error" variant="h6">{error}</Typography>
            </Box>
          ) : (
            <>
              <Grid container spacing={3}>
                {items.length === 0 ? (
                  <Grid item xs={12}>
                    <Paper sx={{ p: 4, textAlign: 'center', backgroundColor: 'transparent', boxShadow: 'none' }}>
                      <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                        No items found for your search.
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setKeyword('');
                          setSearchTerm('');
                          setCategory('');
                          setPage(1);
                        }}
                      >
                        Clear Search & View All
                      </Button>
                    </Paper>
                  </Grid>
                ) : (
                  items.map((item) => (
                    <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
                      <ItemCard item={item} />
                    </Grid>
                  ))
                )}
              </Grid>
              {pages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                  <Pagination count={pages} page={page} onChange={handlePageChange} color="primary" size="large" />
                </Box>
              )}
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default HomeScreen;
