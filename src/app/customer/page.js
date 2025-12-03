'use client';
import { useEffect, useState } from 'react';
import { Container, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

export default function CustomerPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/getProducts')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const addToCart = async (pname) => {
    // call the putInCart API
    const res = await fetch(`/api/putInCart?pname=${pname}&email=customer@test.com`);
    const data = await res.json();
    alert(data.data);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Products</Typography>
      {products.map((p, i) => (
        <Card key={i} sx={{ mb: 2 }}>
          <CardMedia
            component="img"
            height="140"
            image={p.imageUrl}
            alt={p.pname}
          />
          <CardContent>
            <Typography variant="h6">{p.pname}</Typography>
            <Typography variant="body2">{p.description}</Typography>
            <Typography variant="body1">Price: ${p.price}</Typography>
            <Button variant="outlined" sx={{ mt: 1 }} onClick={() => addToCart(p.pname)}>
              Add to Cart
            </Button>
          </CardContent>
        </Card>
        
      ))}
      <Button variant="outlined" href="/view_cart" sx={{ mt: 2 }}>
  View Cart
</Button>

    </Container>
    
  );
}