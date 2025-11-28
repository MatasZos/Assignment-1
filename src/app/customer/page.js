'use client';
import * as React from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';

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
        <Typography variant="h4" gutterBottom>
          Customer Menu
        </Typography>

        {products.length === 0 ? (
          <Typography sx={{ mt: 2 }}>Products loading...</Typography>
        ) : (
          <Grid container spacing={3}>
            {products.map((p) => (
              <Grid item xs={12} sm={6} key={p._id ?? p.title}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={p.image}
                    alt={p.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {p.title}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {p.description}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      €{p.price}
                    </Typography>
                    <Button variant="contained" color="primary" fullWidth>
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Button variant="outlined" color="secondary" size="large">
            View Cart
          </Button>
        </Box>
      </Box>
    </Container>
  );
}