import React from 'react';

import { Grid } from './index';
import { Paper } from '@mui/material';
import { Meta } from '@storybook/react';

const meta: Meta = {
  title: 'UiKit/Grid',
  component: Grid,
  tags: ['autodocs'],
  // Возможно, добавить параметры или аргументы здесь
};

export default meta;

const Item = ({ children }: { children: React.ReactNode }) => (
  <Paper
    sx={{
      p: 2,
      backgroundColor: (theme) => {
        return theme.palette.mode === 'dark' ? '#1A2027' : '#eaeaea';
      },
    }}>
    {children}
  </Paper>
);

export const Default = {
  args: {
    container: true,
    spacing: 2,
    children: (
      <>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={12}>
          <Item>xs=12</Item>
        </Grid>
      </>
    ),
  },
};
