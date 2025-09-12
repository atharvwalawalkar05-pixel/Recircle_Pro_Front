import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel, CircularProgress, Paper } from '@mui/material';

const EditItemScreen = () => {
  const { id: itemId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [itemType, setItemType] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/items/${itemId}`);
        setTitle(data.title);
        setDescription(data.description);
        setCategory(data.category);
        setCondition(data.condition);
        setItemType(data.itemType);
        setFetchLoading(false);
      } catch (err) {
        setError('Could not fetch item data.');
        setFetchLoading(false);
      }
    };
    fetchItem();
  }, [itemId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const updatedData = { title, description, category, condition, itemType };
      await axios.put(`${process.env.REACT_APP_API_URL}/api/items/${itemId}`, updatedData, config);
      setLoading(false);
      navigate(`/item/${itemId}`);
    } catch (err) {
      setError('Failed to update item.');
      setLoading(false);
    }
  };

  if (fetchLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Paper elevation={0} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">Edit Listing</Typography>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextField margin="normal" required fullWidth multiline rows={4} label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <FormControl fullWidth margin="normal"><InputLabel>Category</InputLabel><Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)}><MenuItem value="Electronics">Electronics</MenuItem><MenuItem value="Furniture">Furniture</MenuItem><MenuItem value="Clothing">Clothing</MenuItem><MenuItem value="Books">Books</MenuItem><MenuItem value="Scrap Metal">Scrap Metal</MenuItem><MenuItem value="Other">Other</MenuItem></Select></FormControl>
          <FormControl fullWidth margin="normal"><InputLabel>Condition</InputLabel><Select value={condition} label="Condition" onChange={(e) => setCondition(e.target.value)}><MenuItem value="New">New</MenuItem><MenuItem value="Used - Like New">Used - Like New</MenuItem><MenuItem value="Used - Good">Used - Good</MenuItem><MenuItem value="Used - Fair">Used - Fair</MenuItem></Select></FormControl>
          <FormControl fullWidth margin="normal"><InputLabel>Type</InputLabel><Select value={itemType} label="Type" onChange={(e) => setItemType(e.target.value)}><MenuItem value="Item">Item</MenuItem><MenuItem value="Scrap">Scrap</MenuItem></Select></FormControl>
          <Button type="submit" fullWidth variant="outlined" color="primary" sx={{ mt: 3, mb: 2 }} disabled={loading}>{loading ? 'Updating...' : 'Update Listing'}</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default EditItemScreen;