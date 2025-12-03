'use client';
import React, { useEffect, useState } from 'react';
import {
  Container, Box, Typography, Grid, Card, CardContent, CardMedia, Button,
} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function CustomerPage() {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const userId = "demoUserId"; // Replace with actual user ID

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    await fetch('/api/putInCart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, product }),
    });
    alert(`${product.title} added to cart!`);
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Customer Menu</Typography>
        <Grid container spacing={3}>
          {products.map((p) => (
            <Grid item xs={12} sm={6} key={p._id ?? p.title}>
              <Card>
                <CardMedia component="img" height="200" image={p.image} alt={p.title} />
                <CardContent>
                  <Typography variant="h6">{p.title}</Typography>
                  <Typography>{p.description}</Typography>
                  <Typography>€{p.price}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => addToCart(p)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Button variant="outlined" color="secondary" size="large" onClick={() => router.push('/view_cart')}>
            View Cart
          </Button>
        </Box>
      </Box>
    </Container>
  );
}