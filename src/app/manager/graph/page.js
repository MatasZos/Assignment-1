'use client';
import { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';

export default function ManagerGraphPage() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch('/api/manager/sales')
      .then(res => res.json())
      .then(data => setSales(data));
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Sales Graph (Simple)</Typography>
      {sales.map((s, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <Typography variant="body1">
            Product: {s._id} — Sold: {s.count}
          </Typography>
        </div>
      ))}
    </Container>
  );
}