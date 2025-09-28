import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';
import { Box, Typography, CircularProgress, Grid } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyItems = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/items/myitems`, config);
        setItems(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch your items.');
        setLoading(false);
      }
    };

    if (user) {
      fetchMyItems();
    }
  }, [user]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Typography color="error" align="center">{error}</Typography>;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        My Listings
      </Typography>
      <Grid container spacing={3}>
        {items.length === 0 ? (
          <Grid item xs={12}>
            <Typography>You have not created any listings yet.</Typography>
          </Grid>
        ) : (
          items.map(item => (
            <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
              <ItemCard item={item} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default ProfileScreen;