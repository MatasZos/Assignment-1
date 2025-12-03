'use client';
import { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';

export default function CheckoutPage() {
  const [message, setMessage] = useState('');

  const handleCheckout = async () => {
    const res = await fetch('/api/checkout?email=customer@test.com');
    const data = await res.json();
    setMessage(data.data); 
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleCheckout}
      >
        Place Order
      </Button>
      {message && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Container>
  );
}