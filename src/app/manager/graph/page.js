'use client';
import { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

export default function RevenueGraphPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/manager/sales')
      .then(res => res.json())
      .then(d => setData(d));
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Revenue Over Time</Typography>
      <LineChart
        xAxis={[{ data: data.map(d => new Date(d.date)), scaleType: 'time' }]}
        series={[{ data: data.map(d => d.revenue), label: 'Revenue (€)' }]}
        height={300}
      />
    </Container>
  );
}