import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';
import { Box, Typography, CircularProgress, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Pagination } from '@mui/material';

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
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Latest Listings
      </Typography>

      <Box component="form" onSubmit={searchHandler} sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
        <TextField sx={{ flex: 1 }} variant="outlined" label="Search..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select value={category} label="Category" onChange={handleCategoryChange}>
            <MenuItem value=""><em>All Categories</em></MenuItem>
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>
      ) : error ? (
        <Typography color="error" align="center">{error}</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {items && items.length === 0 ? (
              <Grid item xs={12}>
                <Typography>No items found. Try a different search or filter!</Typography>
              </Grid>
            ) : (
              items && items.map(item => (
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
    </Box>
  );
};

export default HomeScreen;