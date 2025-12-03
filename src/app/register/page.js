'use client';
import { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleRegister = async () => {
    const res = await fetch(`/api/register?email=${email}&pass=${pass}`);
    const data = await res.json();
    alert(data.data);
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
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
        onClick={handleRegister}
      >
        Register
      </Button>
    </Container>
  );
}