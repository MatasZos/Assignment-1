'use client';
import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Logging in...');

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.success) {
      setMessage('Login successful! Redirecting...');
      setTimeout(() => router.push('/customer'), 1500);
    } else {
      setMessage(data.error || 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
        {message && (
          <Typography sx={{ mt: 2 }} color="secondary">
            {message}
          </Typography>
        )}

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            Don’t have an account?{' '}
            <Link href="/register" style={{ color: 'blue', textDecoration: 'underline' }}>
              Register here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}