'use client';
import React from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';

export default function ManagerPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Manager Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Manage Users
                </Typography>
                <Typography variant="body2" gutterBottom>
                  View, edit, or remove registered users.
                </Typography>
                <Button variant="contained" color="primary" fullWidth>
                  Go to Users
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Manage Products
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Add new products or update existing ones.
                </Typography>
                <Button variant="contained" color="primary" fullWidth>
                  Go to Products
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  View Orders
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Track customer orders and update statuses.
                </Typography>
                <Button variant="contained" color="primary" fullWidth>
                  Go to Orders
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Reports & Analytics
                </Typography>
                <Typography variant="body2" gutterBottom>
                  View sales reports and performance metrics.
                </Typography>
                <Button variant="contained" color="primary" fullWidth>
                  Go to Reports
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Settings
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Configure system preferences and account settings.
                </Typography>
                <Button variant="contained" color="primary" fullWidth>
                  Go to Settings
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}