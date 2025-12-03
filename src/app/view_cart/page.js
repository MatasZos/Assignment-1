'use client';
import { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';

export default function ViewCartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('/api/viewCart?email=mataszos@test.com')
      .then(res => res.json())
      .then(data => setCart(data));
  }, []);

  const handleDelete = async (id) => {
    alert("Item Deleted.");
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>My Cart</Typography>
      {cart.map((item, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <Typography variant="body1">
            Product: {item.items[0].pname}
          </Typography>
          <Typography variant="body2">
            Added on: {new Date(item.createdAt).toLocaleString()}
          </Typography>
          <Button variant="outlined" sx={{ mt: 1 }} onClick={() => handleDelete(item._id)}>
            Delete
          </Button>
        </div>
      ))}
    </Container>
  );
}