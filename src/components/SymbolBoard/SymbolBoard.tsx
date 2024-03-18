import { Grid } from '@mui/material';
import React from 'react';
import SymbolItem from '../SymbolItem/SymbolItem';

const SymbolBoard = () => {
  const symbols = [
    {
      name: 'Saya',
    },
    {
      name: 'Saya Ingin',
    },
    {
      name: 'Saya Izin',
    },
    {
      name: 'Ayo Kita',
    },
    {
      name: 'Apakah Kamu',
    },
    {
      name: 'Sangat',
    },
    {
      name: 'Ya',
    },
    {
      name: 'Tidak',
    },
    {
      name: 'Makan',
    },
    {
      name: 'Minum',
    },
    {
      name: 'Tidur',
    },
    {
      name: 'Mengantuk',
    },
    {
      name: 'Lapar',
    },
    {
      name: 'Haus',
    },
    {
      name: 'Pergi',
    },
    {
      name: 'Pulang',
    },
    {
      name: 'Izin',
    },
    {
      name: 'ke toilet',
    },
    {
      name: 'Sakit',
    },
  ];
  return (
    <>
      <Grid container spacing={2} ml={1} mr={5}>
        {symbols.map((symbol, index) => (
          <Grid item key={index}>
            <SymbolItem symbol={symbol} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SymbolBoard;
