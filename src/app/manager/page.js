'use client';
import React, { useEffect, useState } from 'react';
import {
  Container, Box, Typography, Grid, Card, CardContent, Button,
} from '@mui/material';

export default function ManagerPage() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [usersRes, productsRes, ordersRes] = await Promise.all([
        fetch('/api/getUsers'),
        fetch('/api/getProducts'),
        fetch('/api/getOrders'),
      ]);

      const usersData = await usersRes.json();
      const productsData = await productsRes.json();
      const ordersData = await ordersRes.json();

      setUsers(usersData.users || []);
      setProducts(productsData.products || []);
      setOrders(ordersData.orders || []);
    }
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Manager Dashboard</Typography>

        <Grid container spacing={3}>
          {/* Users */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Users</Typography>
                {users.length === 0 ? (
                  <Typography>No users found.</Typography>
                ) : (
                  users.map((u) => (
                    <Typography key={u._id}>
                      {u.username} ({u.email}) – {u.accountType}
                    </Typography>
                  ))
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Products</Typography>
                {products.length === 0 ? (
                  <Typography>No products found.</Typography>
                ) : (
                  products.map((p) => (
                    <Typography key={p._id}>
                      {p.title} – €{p.price}
                    </Typography>
                  ))
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Orders</Typography>
                {orders.length === 0 ? (
                  <Typography>No orders found.</Typography>
                ) : (
                  orders.map((o) => (
                    <Typography key={o._id}>
                      Order #{o._id} – {o.items.length} items – €{o.total} – {o.status}
                    </Typography>
                  ))
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}