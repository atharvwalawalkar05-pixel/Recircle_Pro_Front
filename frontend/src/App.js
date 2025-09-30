import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider
import { CssBaseline, Container } from '@mui/material';
import theme from './theme'; // Import your custom theme

import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import FloatingUploadButton from './components/FloatingUploadButton';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ItemScreen from './screens/ItemScreen';
import CreateItemScreen from './screens/CreateItemScreen';
import EditItemScreen from './screens/EditItemScreen';
import NGOsScreen from './screens/NGOsScreen';
import AboutScreen from './screens/AboutScreen';
import ProfileScreen from './screens/ProfileScreen';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}> {/* Wrap everything with ThemeProvider */}
      <Router>
        <AuthProvider>
          <CssBaseline /> {/* CssBaseline should be inside ThemeProvider to apply dark theme */}
          <Header />
          <Container component="main" sx={{ padding: '20px', minHeight: '80vh' }}>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/item/:id" element={<ItemScreen />} />
              <Route path="/ngos" element={<NGOsScreen />} />
              <Route path="/about" element={<AboutScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/create" element={<CreateItemScreen />} />
                <Route path="/item/:id/edit" element={<EditItemScreen />} />
              </Route>
            </Routes>
          </Container>
          <FloatingUploadButton />
          <Footer />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;