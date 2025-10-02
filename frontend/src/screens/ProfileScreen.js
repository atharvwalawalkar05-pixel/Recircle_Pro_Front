import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Avatar,
  Paper,
  Button,
  Stack,
  Tabs,
  Tab,
  Divider,
  Chip,
} from '@mui/material';
import ItemCard from '../components/ItemCard';
import { AuthContext } from '../context/AuthContext';

/**
 * ProfileScreen
 * Renders user profile with overview, listings, and other tabs.
 * Handles loading and error states and shows a signed-out view.
 */
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
        const apiBase =
          process.env.REACT_APP_API_URL ||
          (typeof window !== 'undefined' && window.location.hostname === 'localhost'
            ? 'http://localhost:5000'
            : '');
        const { data } = await axios.get(`${apiBase}/api/items/myitems`, { headers });
        setItems(data || []); // Ensure items is always an array
      } catch (err) {
        setError('Failed to fetch your items.');
        console.error(err); // It's good practice to log the actual error
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMyItems();
    } else {
      // If no user, no need to fetch, just stop loading
      setLoading(false);
    }
  }, [user]);

  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (_event, newValue) => {
    setActiveTab(newValue);
  };

  const initials = (user?.name || user?.email || '?')
    .split(' ')
    .map((s) => s?.[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '';

  // Signed-out state
  if (!user && !loading) {
    return (
      <Box>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 3,
            borderRadius: 3,
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,249,250,0.9) 100%)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
            textAlign: 'center',
          }}
        >
          <Avatar sx={{ width: 72, height: 72, mx: 'auto', bgcolor: 'primary.main', fontSize: 28 }}>
            ?
          </Avatar>
          <Typography variant="h5" sx={{ mt: 2, mb: 1, fontWeight: 700 }}>
            Welcome to your profile
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Sign in to view your items, requests, and personalize your account.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button component={Link} to="/login" variant="contained" color="primary">
              Sign In
            </Button>
            <Button component={Link} to="/" variant="outlined">
              Browse Items
            </Button>
          </Stack>
        </Paper>
      </Box>
    );
  }

  // Loading State
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Error State
  if (error) {
    return (
      <Typography color="error" align="center" sx={{ my: 4 }}>
        {error}
      </Typography>
    );
  }

  // Signed-in State
  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,249,250,0.9) 100%)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar sx={{ width: 72, height: 72, bgcolor: 'primary.main', fontSize: 28 }}>
              {initials}
            </Avatar>
          </Grid>
          <Grid item xs={12} sm>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {user?.name || 'My Profile'}
            </Typography>
            <Typography color="text.secondary">{user?.email}</Typography>
            {joinDate && <Typography color="text.secondary">Joined {joinDate}</Typography>}
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Chip
                label={user?.isVerified ? 'Email Verified' : 'Email Not Verified'}
                color={user?.isVerified ? 'success' : 'warning'}
                size="small"
                variant="outlined"
              />
            </Stack>
          </Grid>
          <Grid item>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              <Button variant="outlined">Edit Profile</Button>
              <Button variant="contained" color="primary">
                Change Password
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ borderRadius: 3, backgroundColor: '#fff', overflow: 'hidden' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          sx={{ px: 2, borderBottom: '1px solid', borderColor: 'divider' }}
        >
          <Tab label="Overview" />
          <Tab label={`My Items (${items.length})`} />
          <Tab label="Requests" />
          <Tab label="Saved" />
          <Tab label="Impact" />
          <Tab label="Notifications" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {/* Tab 0: Overview */}
          {activeTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
                  <Typography variant="subtitle2" color="text.secondary">Items Listed</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>{items.length}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
                  <Typography variant="subtitle2" color="text.secondary">Items Donated</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>0</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
                  <Typography variant="subtitle2" color="text.secondary">Estimated CO₂ Saved</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>—</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}><Divider sx={{ my: 1 }} /></Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Recent Items</Typography>
                {items.length === 0 ? (
                  <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
                    <Typography sx={{ mb: 2 }}>You haven't listed anything yet.</Typography>
                    <Button component={Link} to="/create" variant="contained">Create a Listing</Button>
                  </Paper>
                ) : (
                  <Grid container spacing={3}>
                    {items.slice(0, 4).map((item) => (
                      <Grid item key={item._id} xs={12} sm={6} md={3}>
                        <ItemCard item={item} />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>
            </Grid>
          )}

          {/* Tab 1: My Items */}
          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>My Listings</Typography>
              <Grid container spacing={3}>
                {items.length === 0 ? (
                  <Grid item xs={12}>
                    <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
                      <Typography sx={{ mb: 2 }}>You have no listings. Create one to get started!</Typography>
                      <Button component={Link} to="/create" variant="contained">Create a Listing</Button>
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
            </Box>
          )}

          {/* Other Tabs (Placeholders) */}
          {[2, 3, 4, 5].includes(activeTab) && (
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {
                  {
                    2: 'Requests',
                    3: 'Saved Items',
                    4: 'Your Impact',
                    5: 'Notifications'
                  }[activeTab]
                }
              </Typography>
              <Typography color="text.secondary">This feature is coming soon.</Typography>
            </Paper>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfileScreen;