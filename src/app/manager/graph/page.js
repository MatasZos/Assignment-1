'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Container, Typography, Box, Button } from "@mui/icons-material";
import NextLink from "next/link";
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';

export default function MyLineChart() {

      const [products, setProducts] = useState(null)


      useEffect(() => {
        fetch('/api/manager/sales')
        .then((res) => res.json())
        .then((data) => setProducts(data.total))
        }, [])
  return (
      <BarChart
      xAxis={[{ data: ['Orders'] }]}
      series={[{ data: [products, 0, 0] }]}
      height={300}
    />
  );
}
