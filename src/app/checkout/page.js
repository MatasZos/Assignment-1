'use client';
import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

  useEffect(() => {
    async function fetchCart() {
      if (!userId) return;
      const res = await fetch(`/api/getCart?userId=${userId}`);
      const data = await res.json();
      setCart(data.items || []);
      const sum = (data.items || []).reduce((acc, item) => acc + (item.price || 0), 0);
      setTotal(sum);
    }
    fetchCart();
  }, [userId]);

  const handleCheckout = async () => {
    if (!userId || cart.length === 0) {
      setMessage('Cart is empty or user not logged in.');
      return;
    }

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, items: cart, total }),
    });

    const data = await res.json();
    if (data.success) {
      setMessage(`Order placed successfully! Order ID: ${data.orderId}`);
      await fetch('/api/clearCart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      setCart([]);
      setTotal(0);
      setTimeout(() => router.push('/customer'), 3000);
    } else {
      setMessage(data.error || 'Checkout failed');
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Checkout</Typography>
        {cart.length === 0 ? (
          <Typography>Your cart is empty.</Typography>
        ) : (
          <>
            <Typography variant="h6">Total: €{total}</Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 2 }}
              onClick={handleCheckout}
            >
              Place Order
            </Button>
          </>
        )}
        {message && (
          <Typography sx={{ mt: 2 }} color="secondary">{message}</Typography>
        )}
      </Box>
    </Container>
  );
}