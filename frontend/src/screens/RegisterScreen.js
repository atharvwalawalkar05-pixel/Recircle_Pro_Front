import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Container,
  Alert,
  Link
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/auth/register`;
      await axios.post(apiUrl, { name, email, password });
      setLoading(false);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 3,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <HomeIcon sx={{ fontSize: '3rem', color: 'primary.main', mb: 1 }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600, color: 'text.primary' }}>
            Join ReCircle
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1 }}>
            Start your journey towards a more sustainable future
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
            sx={{
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 2,
              mb: 2,
            }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Already have an account?{' '}
              <Link
                component={RouterLink}
                to="/login"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterScreen;