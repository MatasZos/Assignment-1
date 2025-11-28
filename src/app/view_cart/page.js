'use client';
import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Card, CardContent, CardMedia } from '@mui/material';

export default function CustomerPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4">Customer Menu</Typography>
        {products.map((p) => (
          <Card key={p._id} sx={{ mt: 2 }}>
            <CardMedia
              component="img"
              height="140"
              image={p.image} 
              alt={p.title}
            />
            <CardContent>
              <Typography variant="h6">{p.title}</Typography>
              <Typography>{p.description}</Typography>
              <Typography>€{p.price}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}