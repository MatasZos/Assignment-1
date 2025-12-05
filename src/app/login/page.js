'use client';
import { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = async () => {
    const res = await fetch(`/api/login?email=${email}&pass=${pass}`);
    const data = await res.json();

    if (data.valid) {
      window.location.href = data.role === 'manager' ? '/manager' : '/customer';
    } else {
      alert('Invalid login');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        onChange={(e) => setPass(e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleLogin}
      >
        Login
      </Button>
      If you don't have an account, please <a href="/register">register here</a>.
    </Container>
  );
}