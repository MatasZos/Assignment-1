'use client';
import { useEffect, useState } from 'react';
import { Container, Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';
import NavBar from '../navigation/NavBar';

export default function CustomerPage() {
  const [products, setProducts] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch('/api/getProducts')
      .then(res => res.json())
      .then(data => setProducts(data));

    fetch('https://api.open-meteo.com/v1/forecast?latitude=53.333&longitude=-6.267&current_weather=true')
      .then(res => res.json())
      .then(data => setWeather(data.current_weather));
  }, []);

  const addToCart = async (pname) => {
    const res = await fetch(`/api/putInCart?pname=${pname}&email=mataszos@test.com`);
    const data = await res.json();
    alert(data.data);
  };

  return (
    <>
      <NavBar />
      <Container sx={{ mt: 5 }}>
        {weather && (
          <Typography variant="h6" gutterBottom>
            Weather in Dublin: {weather.temperature}°C, Wind {weather.windspeed} km/h
          </Typography>
        )}

        <Typography variant="h4" gutterBottom>Products</Typography>

        <Grid container spacing={3}>
          {products.map((p, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card>
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
            </Grid>
          ))}
        </Grid>

        <Button variant="outlined" href="/view_cart" sx={{ mt: 2 }}>
          View Cart
        </Button>
      </Container>
    </>
  );
}