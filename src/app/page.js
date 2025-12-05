'use client';
import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

// Home page with welcome message and navigation buttons
export default function HomePage() {
  return (
    <Container maxWidth="sm">
      <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',}}>
        <Typography variant="h3" gutterBottom>
          Welcome to McDonald's Menu App
          </Typography>
          <Typography variant="h6" gutterBottom>
            Please choose an option below to get started.
        </Typography>

        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            href="/login"
            >
            Login
            </Button>

          <Button 
            variant="outlined" 
            color="primary" 
            href="/register"
            >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
