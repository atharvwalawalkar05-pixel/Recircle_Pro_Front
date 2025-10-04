import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const MAX_IMAGES = 4;

const CreateItemScreen = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [condition, setCondition] = useState('Used - Good');
  const [itemType, setItemType] = useState('Item');
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > MAX_IMAGES) {
      setError(`You can upload up to ${MAX_IMAGES} images only.`);
      setImageFiles(files.slice(0, MAX_IMAGES));
      setImagePreviews(files.slice(0, MAX_IMAGES).map(file => URL.createObjectURL(file)));
    } else {
      setError('');
      setImageFiles(files);
      setImagePreviews(files.map(file => URL.createObjectURL(file)));
    }
  };

  // Remove an image before upload
  const handleRemoveImage = (idx) => {
    const newFiles = [...imageFiles];
    const newPreviews = [...imagePreviews];
    newFiles.splice(idx, 1);
    newPreviews.splice(idx, 1);
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!imageFiles.length) {
      setError('Please select at least one image to upload.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      // Upload all images to Cloudinary
      const uploadPromises = imageFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'recircle_preset');
        
        // Make sure we have the cloud name
        const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
        if (!cloudName) {
          console.error('Missing Cloudinary cloud name in environment variables');
          throw new Error('Configuration error: Missing Cloudinary settings');
        }
        
        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        console.log('Uploading to Cloudinary URL:', cloudinaryUrl);
        
        try {
          const res = await axios.post(cloudinaryUrl, formData);
          console.log('Cloudinary upload success:', res.data.secure_url);
          return res.data.secure_url;
        } catch (uploadError) {
          console.error('Cloudinary upload error:', uploadError.response?.data || uploadError.message);
          throw new Error(`Image upload failed: ${uploadError.message}`);
        }
      });
      
      try {
        const imageUrls = await Promise.all(uploadPromises);
        console.log('All images uploaded successfully:', imageUrls);
        
        const apiUrl = process.env.REACT_APP_API_URL;
        if (!apiUrl) {
          console.error('Missing API URL in environment variables');
          throw new Error('Configuration error: Missing API URL');
        }
        
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const itemData = { title, description, category, condition, itemType, images: imageUrls };
        
        console.log('Sending data to backend:', `${apiUrl}/api/items`);
        await axios.post(`${apiUrl}/api/items`, itemData, config);
        setLoading(false);
        navigate('/');
      } catch (err) {
        console.error('Error in item creation process:', err);
        setError(`Failed to create item: ${err.message}`);
        setLoading(false);
      }
    } catch (err) {
      setError('Failed to create item. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Paper elevation={0} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">Create New Listing</Typography>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextField margin="normal" required fullWidth multiline rows={4} label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Button variant="outlined" color="primary" component="label" fullWidth sx={{ mt: 2 }}>
            Upload Images (max {MAX_IMAGES})
            <input
              type="file"
              hidden
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </Button>
          {imagePreviews.length > 0 && (
            <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {imagePreviews.map((src, idx) => (
                <Box key={idx} sx={{ position: 'relative', width: 80, height: 80 }}>
                  <img
                    src={src}
                    alt={`preview-${idx}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, border: '1px solid #ccc' }}
                  />
                  <Button
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      minWidth: 0,
                      p: '2px',
                      color: 'error.main',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      zIndex: 1,
                    }}
                    onClick={() => handleRemoveImage(idx)}
                  >
                    <DeleteIcon fontSize="small" />
                  </Button>
                </Box>
              ))}
            </Box>
          )}
          <FormControl fullWidth margin="normal"><InputLabel>Category</InputLabel><Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)}><MenuItem value="Electronics">Electronics</MenuItem><MenuItem value="Furniture">Furniture</MenuItem><MenuItem value="Clothing">Clothing</MenuItem><MenuItem value="Books">Books</MenuItem><MenuItem value="Scrap Metal">Scrap Metal</MenuItem><MenuItem value="Other">Other</MenuItem></Select></FormControl>
          <FormControl fullWidth margin="normal"><InputLabel>Condition</InputLabel><Select value={condition} label="Condition" onChange={(e) => setCondition(e.target.value)}><MenuItem value="New">New</MenuItem><MenuItem value="Used - Like New">Used - Like New</MenuItem><MenuItem value="Used - Good">Used - Good</MenuItem><MenuItem value="Used - Fair">Used - Fair</MenuItem></Select></FormControl>
          <FormControl fullWidth margin="normal"><InputLabel>Type</InputLabel><Select value={itemType} label="Type" onChange={(e) => setItemType(e.target.value)}><MenuItem value="Item">Item</MenuItem><MenuItem value="Scrap">Scrap</MenuItem></Select></FormControl>
          <Button type="submit" fullWidth variant="outlined" color="primary" sx={{ mt: 3, mb: 2 }} disabled={loading}>{loading ? 'Creating...' : 'Create Listing'}</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateItemScreen;