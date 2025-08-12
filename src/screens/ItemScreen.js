import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Box, Typography, Button, CircularProgress, Paper, Divider } from '@mui/material';

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

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Typography color="error" align="center">{error}</Typography>;
  if (!item) return <Typography align="center">Item not found.</Typography>;

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <Box
        component="img"
        src={item.image}
        alt={item.title}
        sx={{ width: '100%', height: 'auto', maxHeight: 500, objectFit: 'contain', borderRadius: '4px' }}
      />
      <Typography variant="h4" component="h1" sx={{ my: 2 }}>{item.title}</Typography>
      {user && user._id === item.user && (
        <Box sx={{ my: 2, display: 'flex', gap: '10px' }}>
          <Button variant="contained" component={Link} to={`/item/${item._id}/edit`}>Edit Item</Button>
          <Button variant="contained" color="error" onClick={deleteHandler}>Delete Item</Button>
        </Box>
      )}
      <Typography variant="h6"><strong>Category:</strong> {item.category}</Typography>
      <Typography variant="h6"><strong>Condition:</strong> {item.condition}</Typography>
      <Typography variant="h6"><strong>Type:</strong> {item.itemType}</Typography>
      <Divider sx={{ my: 2 }}/>
      <Typography>{item.description}</Typography>
    </Paper>
  );
};

export default ItemScreen;