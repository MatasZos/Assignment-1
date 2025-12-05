'use client';
import { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';

// Manager dashboard showing orders and link to sales graph

export default function ManagerPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/api/manager/orders')
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  // Show orders and a button to view sales graph
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Manager Dashboard</Typography>
      {orders.map((order, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <Typography variant="body1">
            Customer: {order.userEmail}
          </Typography>
          <Typography variant="body2">
            Status: {order.status}
          </Typography>
          <Typography variant="body2">
            Items: {order.items.map(it => it.pname).join(', ')}
          </Typography>
        </div>
      ))}
      <Button
        variant="contained"
        sx={{ mt: 3 }}
        href="/manager/graph"
      >
        View Sales Graph
      </Button>
    </Container>
  );
}