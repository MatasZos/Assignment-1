'use client';
import React, { useEffect, useState } from 'react';
import {
  Container, Box, Typography, Card, CardContent, CardMedia, Button,
} from '@mui/material';

export default function ViewCartPage() {
  const [cart, setCart] = useState([]);
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

  useEffect(() => {
    async function fetchCart() {
      if (!userId) return;
      const res = await fetch(`/api/getCart?userId=${userId}`);
      const data = await res.json();
      setCart(data.items || []);
    }
    fetchCart();
  }, [userId]);

  const removeItem = async (index) => {
    await fetch('/api/removeFromCart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, index }),
    });
    setCart(cart.filter((_, i) => i !== index));
  };

  const clearCart = async () => {
    await fetch('/api/clearCart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Your Cart</Typography>
        {cart.length === 0 ? (
          <Typography sx={{ mt: 2 }}>Your cart is empty.</Typography>
        ) : (
          <>
            {cart.map((item, index) => (
              <Card key={index} sx={{ mt: 2 }}>
                <CardMedia component="img" height="140" image={item.image} alt={item.title} />
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography>{item.description}</Typography>
                  <Typography>€{item.price}</Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ mt: 1 }}
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            ))}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="h6">Total: €{total}</Typography>
              <Button variant="contained" color="error" size="large" onClick={clearCart} sx={{ mt: 2 }}>
                Clear Cart
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}