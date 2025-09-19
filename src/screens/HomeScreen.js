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
    <Box sx={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'left', px: { xs: 2, md: 6 }, py: 4 }}>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: 'text.primary',
            mb: 2,
            fontSize: { xs: '2rem', md: '3rem' },
          }}
        >
          ReCircle Recycling
        </Typography>
        <Box
          component="img"
          src="https://via.placeholder.com/1200x400?text=Recycling+Hero+Image" // Replace with actual image URL
          alt="Hero Image"
          sx={{ width: '100%', height: 'auto', borderRadius: 0 }}
        />
      </Box>

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
                src="https://via.placeholder.com/400x300?text=Reuse+Concept+1" // Replace with actual image
                alt="Concept 1"
                sx={{ width: '100%', height: 'auto', borderRadius: 0 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                component="img"
                src="https://via.placeholder.com/400x300?text=Reuse+Concept+2" // Replace with actual image
                alt="Concept 2"
                sx={{ width: '100%', height: 'auto', borderRadius: 0 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                component="img"
                src="https://via.placeholder.com/400x300?text=Reuse+Concept+3" // Replace with actual image
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
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error" align="center">{error}</Typography>
          ) : (
            <>
              <Grid container spacing={2}>
                {items.length === 0 ? (
                  <Grid item xs={12}>
                    <Typography align="center" color="text.secondary">
                      No items found. Try adjusting your search.
                    </Typography>
                  </Grid>
                ) : (
                  items.map((item) => (
                    <Grid item key={item._id} xs={12} sm={6} md={4}>
                      <ItemCard item={item} />
                    </Grid>
                  ))
                )}
              </Grid>
              {pages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination count={pages} page={page} onChange={handlePageChange} />
                </Box>
              )}
            </>
          )}

          {/* Additional Images */}
          <Grid container spacing={2} sx={{ mt: 6 }}>
            <Grid item xs={12} md={4}>
              <Box
                component="img"
                src="https://via.placeholder.com/400x300?text=Recycling+Image+1" // Replace with actual
                alt="Image 1"
                sx={{ width: '100%', height: 'auto' }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                component="img"
                src="https://via.placeholder.com/400x300?text=Recycling+Image+2" // Replace with actual
                alt="Image 2"
                sx={{ width: '100%', height: 'auto' }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                component="img"
                src="https://via.placeholder.com/400x300?text=Recycling+Image+3" // Replace with actual
                alt="Image 3"
                sx={{ width: '100%', height: 'auto' }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer Note */}
      <Box sx={{ textAlign: 'center', py: 2, backgroundColor: '#FFFFFF' }}>
        <Typography variant="body2" color="text.secondary">
          © 2023 ReCircle
        </Typography>
      </Box>
    </Box>
  );
};

export default HomeScreen;
