import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';
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
import { Link } from 'react-router-dom';
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
        const apiBase =
          process.env.REACT_APP_API_URL ||
          (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:5000' : '');
        const { data } = await axios.get(`${apiBase}/api/items/myitems`, config);
        setItems(data);
        setLoading(false);
      } catch (_err) {
        setError('Failed to fetch your items.');
        setLoading(false);
      }
    };

    if (user) fetchMyItems();
    else setLoading(false);
  }, [user]);

  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (_e, value) => setActiveTab(value);

  const initials = (user?.name || user?.email || '?')
    .split(' ')
    .map((s) => s?.[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '';

  // Signed-out state: show a welcoming message and clear actions so the page isn't blank
  if (!user) {
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

        <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            What you can do
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Create listings to donate items, save favorites, and track your impact.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button variant="contained" color="primary" disabled>
              Create a Listing
            </Button>
            <Button variant="outlined" component={Link} to="/">
              Explore Recent Items
            </Button>
          </Stack>
        </Paper>
      </Box>
    );
  }

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Typography color="error" align="center">{error}</Typography>;

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,249,250,0.9) 100%)',
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
            <Stack direction="row" spacing={1}>
              <Button variant="outlined">Edit Profile</Button>
              <Button variant="contained" color="primary">
                Change Password
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ borderRadius: 3, backgroundColor: '#fff' }}>
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
          <Tab label="Impact" />import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';
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
import { Link } from 'react-router-dom';
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
        const apiBase =
          process.env.REACT_APP_API_URL ||
          (typeof window !== 'undefined' && window.location.hostname === 'localhost'
            ? 'http://localhost:5000'
            : '');
        const { data } = await axios.get(`${apiBase}/api/items/myitems`, config);
        setItems(data);
        setLoading(false);
      } catch (_err) {
        setError('Failed to fetch your items.');
        setLoading(false);
      }
    };

    if (user) fetchMyItems();
    else setLoading(false);
  }, [user]);

  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (_e, value) => setActiveTab(value);

  const initials = (user?.name || user?.email || '?')
    .split(' ')
    .map((s) => s?.[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';
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
import { Link } from 'react-router-dom';
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
        const apiBase =
          process.env.REACT_APP_API_URL ||
          (typeof window !== 'undefined' && window.location.hostname === 'localhost'
            ? 'http://localhost:5000'
            : '');
        const { data } = await axios.get(`${apiBase}/api/items/myitems`, config);
        setItems(data);
        setLoading(false);
      } catch (_err) {
        setError('Failed to fetch your items.');
        setLoading(false);
      }
    };

    if (user) fetchMyItems();
    else setLoading(false);
  }, [user]);

  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (_e, value) => setActiveTab(value);

  const initials = (user?.name || user?.email || '?')
    .split(' ')
    .map((s) => s?.[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '';

  // Signed-out: show welcome message and actions
  if (!user) {
    return (
      <Box>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 3,
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,249,250,0.9) 100%)',
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

        <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            What you can do
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Create listings to donate items, save favorites, and track your impact.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button variant="contained" color="primary" disabled>
              Create a Listing
            </Button>
            <Button variant="outlined" component={Link} to="/">
              Explore Recent Items
            </Button>
          </Stack>
        </Paper>
      </Box>
    );
  }

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  if (error) return <Typography color="error" align="center">{error}</Typography>;

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
            <Stack direction="row" spacing={1}>
              <Button variant="outlined">Edit Profile</Button>
              <Button variant="contained" color="primary">
                Change Password
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ borderRadius: 3, backgroundColor: '#fff' }}>
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
          {activeTab === 0 && (
            <Grid container spacing={3}>
              {/* Stats */}
              <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Items Listed
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {items.length}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Items Donated
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    0
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Estimated CO₂ Saved
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    —
                  </Typography>
                </Paper>
              </Grid>

              {/* About Me */}
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    About Me
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    Share a short bio to let others know who you are and what you’re interested in
                    giving or receiving. This helps build trust in the community.
                  </Typography>
                  <Button variant="outlined">Add a bio</Button>
                </Paper>
              </Grid>

              {/* Quick Actions */}
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    Quick Actions
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button component={Link} to="/create" variant="contained" color="primary">
                      Create a Listing
                    </Button>
                    <Button component={Link} to="/" variant="outlined">
                      Browse Items
                    </Button>
                    <Button variant="outlined">Invite Friends</Button>
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>

              {/* Recent Items */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                  Recent Items
                </Typography>
                {items.length === 0 ? (
                  <Paper elevation={0} sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
                    <Typography sx={{ mb: 1 }}>You haven’t listed anything yet.</Typography>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      Start by creating your first listing.
                    </Typography>
                    <Button component={Link} to="/create" variant="contained" color="primary">
                      Create a Listing
                    </Button>
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

          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                My Listings
              </Typography>
              <Grid container spacing={3}>
                {items.length === 0 ? (
                  <Grid item xs={12}>
                    <Paper elevation={0} sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
                      <Typography sx={{ mb: 1 }}>You have not created any listings yet.</Typography>
                      <Typography color="text.secondary" sx={{ mb: 2 }}>
                        Create a listing to donate items you no longer need.
                      </Typography>
                      <Button component={Link} to="/create" variant="contained" color="primary">
                        Create a Listing
                      </Button>
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

          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Requests
              </Typography>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                <Typography color="text.secondary" sx={{ mb: 1 }}>
                  No requests yet.
                </Typography>
                <Typography color="text.secondary">
                  When someone is interested in your items, their requests will show up here.
                </Typography>
              </Paper>
            </Box>
          )}

          {activeTab === 3 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Saved Items
              </Typography>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
                <Typography sx={{ mb: 1 }}>You haven’t saved any items yet.</Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Browse items and tap the save icon to keep them here.
                </Typography>
                <Button component={Link} to="/" variant="outlined">
                  Browse Items
                </Button>
              </Paper>
            </Box>
          )}

          {activeTab === 4 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Impact
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Items Reused
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      0
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Estimated CO₂ Saved
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      —
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Community Connections
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      0
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}

          {activeTab === 5 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Notifications
              </Typography>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                <Typography color="text.secondary">
                  Notification preferences coming soon. You’ll be able to choose how you get updates
                  about your items and requests.
                </Typography>
              </Paper>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfileScreen;import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';
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
import { Link } from 'react-router-dom';
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
        const apiBase =
          process.env.REACT_APP_API_URL ||
          (typeof window !== 'undefined' && window.location.hostname === 'localhost'
            ? 'http://localhost:5000'
            : '');
        const { data } = await axios.get(`${apiBase}/api/items/myitems`, config);
        setItems(data);
        setLoading(false);
      } catch (_err) {
        setError('Failed to fetch your items.');
        setLoading(false);
      }
    };

    if (user) fetchMyItems();
    else setLoading(false);
  }, [user]);

  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (_e, value) => setActiveTab(value);

  const initials = (user?.name || user?.email || '?')
    .split(' ')
    .map((s) => s?.[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '';

  // Signed-out: show welcome message and actions
  if (!user) {
    return (
      <Box>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 3,
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,249,250,0.9) 100%)',
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

        <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            What you can do
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Create listings to donate items, save favorites, and track your impact.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button variant="contained" color="primary" disabled>
              Create a Listing
            </Button>
            <Button variant="outlined" component={Link} to="/">
              Explore Recent Items
            </Button>
          </Stack>
        </Paper>
      </Box>
    );
  }

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  if (error) return <Typography color="error" align="center">{error}</Typography>;

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
            <Stack direction="row" spacing={1}>
              <Button variant="outlined">Edit Profile</Button>
              <Button variant="contained" color="primary">
                Change Password
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ borderRadius: 3, backgroundColor: '#fff' }}>
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
          {activeTab === 0 && (
            <Grid container spacing={3}>
              {/* Stats */}
              <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Items Listed
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {items.length}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Items Donated
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    0
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Estimated CO₂ Saved
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    —
                  </Typography>
                </Paper>
              </Grid>

              {/* About Me */}
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    About Me
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    Share a short bio to let others know who you are and what you’re interested in
                    giving or receiving. This helps build trust in the community.
                  </Typography>
                  <Button variant="outlined">Add a bio</Button>
                </Paper>
              </Grid>

              {/* Quick Actions */}
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    Quick Actions
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button component={Link} to="/create" variant="contained" color="primary">
                      Create a Listing
                    </Button>
                    <Button component={Link} to="/" variant="outlined">
                      Browse Items
                    </Button>
                    <Button variant="outlined">Invite Friends</Button>
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>

              {/* Recent Items */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                  Recent Items
                </Typography>
                {items.length === 0 ? (
                  <Paper elevation={0} sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
                    <Typography sx={{ mb: 1 }}>You haven’t listed anything yet.</Typography>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      Start by creating your first listing.
                    </Typography>
                    <Button component={Link} to="/create" variant="contained" color="primary">
                      Create a Listing
                    </Button>
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

          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                My Listings
              </Typography>
              <Grid container spacing={3}>
                {items.length === 0 ? (
                  <Grid item xs={12}>
                    <Paper elevation={0} sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
                      <Typography sx={{ mb: 1 }}>You have not created any listings yet.</Typography>
                      <Typography color="text.secondary" sx={{ mb: 2 }}>
                        Create a listing to donate items you no longer need.
                      </Typography>
                      <Button component={Link} to="/create" variant="contained" color="primary">
                        Create a Listing
                      </Button>
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

          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Requests
              </Typography>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                <Typography color="text.secondary" sx={{ mb: 1 }}>
                  No requests yet.
                </Typography>
                <Typography color="text.secondary">
                  When someone is interested in your items, their requests will show up here.
                </Typography>
              </Paper>
            </Box>
          )}

          {activeTab === 3 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Saved Items
              </Typography>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
                <Typography sx={{ mb: 1 }}>You haven’t saved any items yet.</Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Browse items and tap the save icon to keep them here.
                </Typography>
                <Button component={Link} to="/" variant="outlined">
                  Browse Items
                </Button>
              </Paper>
            </Box>
          )}

          {activeTab === 4 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Impact
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Items Reused
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      0
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Estimated CO₂ Saved
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      —
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Community Connections
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      0
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}

          {activeTab === 5 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Notifications
              </Typography>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                <Typography color="text.secondary">
                  Notification preferences coming soon. You’ll be able to choose how you get updates
                  about your items and requests.
                </Typography>
              </Paper>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfileScreen;

  const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '';

  // Signed-out state: show a welcoming message and clear actions so the page isn't blank
  if (!user) {
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

        <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            What you can do
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Create listings to donate items, save favorites, and track your impact.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button variant="contained" color="primary" disabled>
              Create a Listing
            </Button>
            <Button variant="outlined" component={Link} to="/">
              Explore Recent Items
            </Button>
          </Stack>
        </Paper>
      </Box>
    );
  }

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Typography color="error" align="center">{error}</Typography>;

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,249,250,0.9) 100%)',
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
            <Stack direction="row" spacing={1}>
              <Button variant="outlined">Edit Profile</Button>
              <Button variant="contained" color="primary">
                Change Password
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ borderRadius: 3, backgroundColor: '#fff' }}>
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
          {activeTab === 0 && (
            <Grid container spacing={3}>
              {/* Stats */}
              <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Items Listed
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {items.length}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Items Donated
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    0
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Estimated CO₂ Saved
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    —
                  </Typography>
                </Paper>
              </Grid>

              {/* About Me */}
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    About Me
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    Share a short bio to let others know who you are and what you’re interested in
                    giving or receiving. This helps build trust in the community.
                  </Typography>
                  <Button variant="outlined">Add a bio</Button>
                </Paper>
              </Grid>

              {/* Quick Actions */}
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    Quick Actions
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button component={Link} to="/create" variant="contained" color="primary">
                      Create a Listing
                    </Button>
                    <Button component={Link} to="/" variant="outlined">
                      Browse Items
                    </Button>
                    <Button variant="outlined">Invite Friends</Button>
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>

              {/* Recent Items */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                  Recent Items
                </Typography>
                {items.length === 0 ? (
                  <Paper elevation={0} sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
                    <Typography sx={{ mb: 1 }}>You haven’t listed anything yet.</Typography>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      Start by creating your first listing.
                    </Typography>
                    <Button component={Link} to="/create" variant="contained" color="primary">
                      Create a Listing
                    </Button>
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

          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                My Listings
              </Typography>
              <Grid container spacing={3}>
                {items.length === 0 ? (
                  <Grid item xs={12}>
                    <Paper elevation={0} sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
                      <Typography sx={{ mb: 1 }}>You have not created any listings yet.</Typography>
                      <Typography color="text.secondary" sx={{ mb: 2 }}>
                        Create a listing to donate items you no longer need.
                      </Typography>
                      <Button component={Link} to="/create" variant="contained" color="primary">
                        Create a Listing
                      </Button>
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

          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Requests
              </Typography>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                <Typography color="text.secondary" sx={{ mb: 1 }}>
                  No requests yet.
                </Typography>
                <Typography color="text.secondary">
                  When someone is interested in your items, their requests will show up here.
                </Typography>
              </Paper>
            </Box>
          )}

          {activeTab === 3 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Saved Items
              </Typography>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
                <Typography sx={{ mb: 1 }}>You haven’t saved any items yet.</Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Browse items and tap the save icon to keep them here.
                </Typography>
                <Button component={Link} to="/" variant="outlined">
                  Browse Items
                </Button>
              </Paper>
            </Box>
          )}

          {activeTab === 4 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Impact
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Items Reused
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      0
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Estimated CO₂ Saved
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      —
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Community Connections
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      0
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}

          {activeTab === 5 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Notifications
              </Typography>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                <Typography color="text.secondary">
                  Notification preferences coming soon. You’ll be able to choose how you get updates
                  about your items and requests.
                </Typography>
              </Paper>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfileScreen;
          <Tab label="Notifications" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {activeTab === 0 && (
            <Grid container spacing={3}>
              {/* Stats */}
              <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Items Listed
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {items.length}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Items Donated
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    0
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Estimated CO₂ Saved
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    —
                  </Typography>
                </Paper>
              </Grid>

              {/* About Me */}
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    About Me
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    Share a short bio to let others know who you are and what you’re interested in
                    giving or receiving. This helps build trust in the community.
                  </Typography>
                  <Button variant="outlined">Add a bio</Button>
                </Paper>
              </Grid>

              {/* Quick Actions */}
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    Quick Actions
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button component={Link} to="/create" variant="contained" color="primary">
                      Create a Listing
                    </Button>
                    <Button component={Link} to="/" variant="outlined">
                      Browse Items
                    </Button>
                    <Button variant="outlined">Invite Friends</Button>
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>

              {/* Recent Items */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                  Recent Items
                </Typography>
                {items.length === 0 ? (
                  <Paper elevation={0} sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
                    <Typography sx={{ mb: 1 }}>You haven’t listed anything yet.</Typography>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      Start by creating your first listing.
                    </Typography>
                    <Button component={Link} to="/create" variant="contained" color="primary">
                      Create a Listing
                    </Button>
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

          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                My Listings
              </Typography>
              <Grid container spacing={3}>
                {items.length === 0 ? (
                  <Grid item xs={12}>
                    <Paper elevation={0} sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
                      <Typography sx={{ mb: 1 }}>You have not created any listings yet.</Typography>
                      <Typography color="text.secondary" sx={{ mb: 2 }}>
                        Create a listing to donate items you no longer need.
                      </Typography>
                      <Button component={Link} to="/create" variant="contained" color="primary">
                        Create a Listing
                      </Button>
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

          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Requests
              </Typography>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                <Typography color="text.secondary" sx={{ mb: 1 }}>
                  No requests yet.
                </Typography>
                <Typography color="text.secondary">
                  When someone is interested in your items, their requests will show up here.
                </Typography>
              </Paper>
            </Box>
          )}

          {activeTab === 3 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Saved Items
              </Typography>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
                <Typography sx={{ mb: 1 }}>You haven’t saved any items yet.</Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Browse items and tap the save icon to keep them here.
                </Typography>
                <Button component={Link} to="/" variant="outlined">
                  Browse Items
                </Button>
              </Paper>
            </Box>
          )}

          {activeTab === 4 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Impact
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Items Reused
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      0
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Estimated CO₂ Saved
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      —
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Community Connections
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      0
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}

          {activeTab === 5 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Notifications
              </Typography>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                <Typography color="text.secondary">
                  Notification preferences coming soon. You’ll be able to choose how you get updates
                  about your items and requests.
                </Typography>
              </Paper>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfileScreen;import React, { useState, useEffect, useContext } from 'react';
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