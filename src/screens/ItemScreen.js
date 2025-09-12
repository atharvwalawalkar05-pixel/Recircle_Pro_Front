import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Box, Typography, Button, CircularProgress, Paper, Divider } from '@mui/material';
import Slider from "react-slick";

const ItemScreen = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/items/${id}`);
        setItem(data);
        setLoading(false);
      } catch (err) {
        setError('Item not found.');
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const deleteHandler = async () => {
    if (window.confirm('Are you sure?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/items/${id}`, config);
        navigate('/');
      } catch (err) {
        setError('Could not delete item.');
      }
    }
  };

  const images = item && item.images && item.images.length > 0 ? item.images : [item.image]; // fallback for old items

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Typography color="error" align="center">{error}</Typography>;
  if (!item) return <Typography align="center">Item not found.</Typography>;

  return (
    <Paper elevation={0} sx={{ p: 3, mt: 4 }}>
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
        <Box sx={{ mb: 3 }}>
          <Slider {...sliderSettings}>
            {images.map((img, idx) => (
              <Box key={idx} sx={{ textAlign: 'center' }}>
                <img
                  src={img}
                  alt={`item-img-${idx}`}
                  style={{ maxHeight: 350, maxWidth: '100%', borderRadius: 8, margin: '0 auto' }}
                />
              </Box>
            ))}
          </Slider>
        </Box>
        <Typography variant="h4" component="h1" sx={{ my: 2 }}>{item.title}</Typography>
        {user && user._id === item.user && (
          <Box sx={{ my: 2, display: 'flex', gap: '10px' }}>
            <Button variant="outlined" color="primary" component={Link} to={`/item/${item._id}/edit`}>Edit Item</Button>
            <Button variant="outlined" color="error" onClick={deleteHandler}>Delete Item</Button>
          </Box>
        )}
        <Typography variant="h6"><strong>Category:</strong> {item.category}</Typography>
        <Typography variant="h6"><strong>Condition:</strong> {item.condition}</Typography>
        <Typography variant="h6"><strong>Type:</strong> {item.itemType}</Typography>
        <Divider sx={{ my: 2 }}/>
        <Typography>{item.description}</Typography>
      </Box>
    </Paper>
  );
};

export default ItemScreen;