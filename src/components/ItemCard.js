import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';

const ItemCard = ({ item }) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2, height: '100%' }}>
      <CardActionArea component={Link} to={`/item/${item._id}`}>
        <CardMedia
          component="img"
          height="140"
          image={item.image}
          alt={item.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description.substring(0, 100)}...
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Condition:</strong> {item.condition}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ItemCard;