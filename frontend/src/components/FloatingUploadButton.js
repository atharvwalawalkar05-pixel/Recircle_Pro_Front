import React, { useContext } from 'react';
import { Fab, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const FloatingUploadButton = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleClick = () => {
    if (user) {
      navigate('/create');
    } else {
      navigate('/login');
    }
  };

  return (
    <Tooltip title={user ? "Upload New Item" : "Login to Upload"} arrow>
      <Fab 
        color="primary" 
        aria-label="add" 
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 6px 12px rgba(0,0,0,0.4)',
          },
          transition: 'all 0.3s ease'
        }}
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};

export default FloatingUploadButton;