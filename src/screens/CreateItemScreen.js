import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel, Paper } from '@mui/material';

const CreateItemScreen = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [condition, setCondition] = useState('Used - Good');
  const [itemType, setItemType] = useState('Item');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setError('Please select an image to upload.');
      return;
    }
    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'recircle_preset');
    try {
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;
      const cloudinaryRes = await axios.post(cloudinaryUrl, formData);
      const imageUrl = cloudinaryRes.data.secure_url;
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const itemData = { title, description, category, condition, itemType, image: imageUrl };
      await axios.post(`${process.env.REACT_APP_API_URL}/api/items`, itemData, config);
      setLoading(false);
      navigate('/');
    } catch (err) {
      setError('Failed to create item. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">Create New Listing</Typography>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextField margin="normal" required fullWidth multiline rows={4} label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
            Upload Image
            <input type="file" hidden accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
          </Button>
          {imageFile && <Typography sx={{ mt:1 }}>{imageFile.name}</Typography>}
          <FormControl fullWidth margin="normal"><InputLabel>Category</InputLabel><Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)}><MenuItem value="Electronics">Electronics</MenuItem><MenuItem value="Furniture">Furniture</MenuItem><MenuItem value="Clothing">Clothing</MenuItem><MenuItem value="Books">Books</MenuItem><MenuItem value="Scrap Metal">Scrap Metal</MenuItem><MenuItem value="Other">Other</MenuItem></Select></FormControl>
          <FormControl fullWidth margin="normal"><InputLabel>Condition</InputLabel><Select value={condition} label="Condition" onChange={(e) => setCondition(e.target.value)}><MenuItem value="New">New</MenuItem><MenuItem value="Used - Like New">Used - Like New</MenuItem><MenuItem value="Used - Good">Used - Good</MenuItem><MenuItem value="Used - Fair">Used - Fair</MenuItem></Select></FormControl>
          <FormControl fullWidth margin="normal"><InputLabel>Type</InputLabel><Select value={itemType} label="Type" onChange={(e) => setItemType(e.target.value)}><MenuItem value="Item">Item</MenuItem><MenuItem value="Scrap">Scrap</MenuItem></Select></FormControl>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>{loading ? 'Creating...' : 'Create Listing'}</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateItemScreen;