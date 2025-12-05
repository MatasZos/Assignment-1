'use client';
import { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import NavBar from '../navigation/NavBar'; 

// View Cart page showing items in cart and total price
export default function ViewCartPage() {
  const [cart, setCart] = useState([]);

  // Fetch cart items 
  useEffect(() => {
    fetch('/api/viewCart?email=mataszos@test.com')
      .then(res => res.json())
      .then(data => setCart(data));
  }, []);

  // Handle delete item from cart
  const handleDelete = async (id) => {
    await fetch(`/api/deleteCartItem?id=${id}`, { method: 'DELETE' });
    setCart(cart.filter(item => item._id !== id));
  };

  // Calculate total price
  const total = cart.reduce((sum, item) => {
    const price = item.items?.[0]?.price || 0;
    return sum + price;
  }, 0);

  return (
    <>
    <NavBar />
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>My Cart</Typography>
      <Typography variant="h6" gutterBottom>Total to Pay: €{total}</Typography>
      {/* List of cart items */}
      {cart.map((item, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <Typography variant="body1">
            Product: {item.items?.[0]?.pname || "No product"}
          </Typography>
          <Typography variant="body2">
            Price: €{item.items?.[0]?.price || 0}
          </Typography>
          <Button variant="outlined" sx={{ mt: 1 }} onClick={() => handleDelete(item._id)}>
            Delete
          </Button>
        </div>
      ))}

      <Button variant="contained" color="primary" href="/checkout" sx={{ mt: 3 }}>
        Proceed to Checkout
      </Button>
    </Container>
    </>
  );
}