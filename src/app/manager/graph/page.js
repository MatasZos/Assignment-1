'use client';
import { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

export default function ManagerGraphPage() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch('/api/manager/sales')
      .then(res => res.json())
      .then(data => setSales(data));
  }, []);

  const productNames = sales.map(s => s._id);
  const productCounts = sales.map(s => s.count);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Sales Graph</Typography>
      <BarChart
        xAxis={[{ data: productNames }]}
        series={[{ data: productCounts }]}
        height={300}
      />
    </Container>
  );
}