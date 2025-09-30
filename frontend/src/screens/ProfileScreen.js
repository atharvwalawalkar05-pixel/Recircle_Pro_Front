import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';
import { Box, Typography, CircularProgress, Grid, Avatar, Paper, Button, Stack, Tabs, Tab, Divider, Chip } from '@mui/material';
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
        const headers = user?.token ? { Authorization: `Bearer ${user.token}` } : {};
        const config = { headers };
        const apiBase = process.env.REACT_APP_API_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:5000' : '');
        const { data } = await axios.get(`${apiBase}/api/items/myitems`, config);
        setItems(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch your items.');
        setLoading(false);
      }
    };

    if (user) fetchMyItems();
  }, [user]);

  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (_e, value) => setActiveTab(value);

  if (!user) {
    return (
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Please sign in to view your profile</Typography>
        <Typography color="text.secondary">You need an account to see your items and activity.</Typography>
      </Box>
    );
  }

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Typography color="error" align="center">{error}</Typography>;

  const initials = (user?.name || user?.email || '?')
    .split(' ')
    .map(s => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '';

  return (
    <Box>
      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3, background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,249,250,0.9) 100%)', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar sx={{ width: 72, height: 72, bgcolor: 'primary.main', fontSize: 28 }}>{initials}</Avatar>
          </Grid>
          <Grid item xs={12} sm>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>{user?.name || 'My Profile'}</Typography>
            <Typography color="text.secondary">{user?.email}</Typography>
            {joinDate && (
              <Typography color="text.secondary">Joined {joinDate}</Typography>
            )}
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Chip label="Email Verified" color="success" size="small" variant="outlined" />
            </Stack>
          </Grid>
          <Grid item>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined">Edit Profile</Button>
              <Button variant="contained" color="primary">Change Password</Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ borderRadius: 3, backgroundColor: '#fff' }}>
        <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons allowScrollButtonsMobile sx={{ px: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Tab label="Overview" />
          <Tab label={`My Items (${items.length})`} />
          <Tab label="Requests" />
          <Tab label="Saved" />
          <Tab label="Impact" />
          <Tab label="Notifications" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {activeTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">Items Listed</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>{items.length}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">Items Donated</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>0</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">Estimated CO₂ Saved</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>—</Typography>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Recent Items</Typography>
                <Grid container spacing={3}>
                  {items.slice(0, 4).map(item => (
                    <Grid item key={item._id} xs={12} sm={6} md={3}>
                      <ItemCard item={item} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}

          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>My Listings</Typography>
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
          )}

          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Requests</Typography>
              <Typography color="text.secondary">No requests yet.</Typography>
            </Box>
          )}

          {activeTab === 3 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Saved Items</Typography>
              <Typography color="text.secondary">You haven't saved any items yet.</Typography>
            </Box>
          )}

          {activeTab === 4 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Impact</Typography>
              <Typography color="text.secondary">Impact analytics coming soon.</Typography>
            </Box>
          )}

          {activeTab === 5 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Notifications</Typography>
              <Typography color="text.secondary">Notification preferences coming soon.</Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfileScreen;