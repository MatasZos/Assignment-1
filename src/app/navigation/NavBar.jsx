'use client';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <img 
          src="images/mcdonalds.png" 
          alt="McDonalds Logo" 
          style={{ width: 40, height: 40, marginRight: 10 }} 
        />

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          McDonalds
        </Typography>

        <Button href="/customer">Product</Button>
        <Button href="/view_cart">View Cart</Button>
        <Button href="/">Logout</Button>
      </Toolbar>
    </AppBar>
  );
}