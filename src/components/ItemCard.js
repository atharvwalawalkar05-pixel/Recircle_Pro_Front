import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const ItemCard = ({ item }) => {
  const getConditionColor = (condition) => {
    switch (condition) {
      case 'New':
        return 'success';
      case 'Used - Like New':
        return 'info';
      case 'Used - Good':
        return 'warning';
      case 'Used - Fair':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        },
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <CardActionArea
        component={Link}
        to={`/item/${item._id}`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          alignItems: 'stretch',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="180"
            image={item.image}
            alt={item.title}
            sx={{
              objectFit: 'cover',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(255,255,255,0.9)',
              borderRadius: '50%',
              p: 0.5,
            }}
          >
            <HomeIcon sx={{ color: 'primary.main', fontSize: '1.2rem' }} />
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 600,
              fontSize: '1.1rem',
              lineHeight: 1.3,
              mb: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {item.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: 1.4,
            }}
          >
            {item.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Chip
              label={item.condition}
              size="small"
              color={getConditionColor(item.condition)}
              variant="outlined"
              sx={{
                fontSize: '0.7rem',
                height: '24px',
                fontWeight: 500,
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography
              variant="body2"
              sx={{
                color: 'primary.main',
                fontWeight: 500,
                textTransform: 'capitalize',
              }}
            >
              {item.category}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontSize: '0.8rem',
              }}
            >
              {item.itemType}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ItemCard;