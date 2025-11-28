'use client'
import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4">Login</Typography>
        <form>
          <TextField label="Email" name="email" fullWidth required />
          <TextField label="Password" name="password" type="password" fullWidth required />
          <Button variant="contained" sx={{ mt: 2 }} type="submit">
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
}
