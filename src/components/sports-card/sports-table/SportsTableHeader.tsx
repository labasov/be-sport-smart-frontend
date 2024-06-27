import React from 'react';
import { TableHead, TableRow, TableCell } from '@mui/material';

export const SportsTableHeader: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Sport</TableCell>
        <TableCell>Score</TableCell>
        <TableCell>Important measures</TableCell>
        <TableCell>Recommendation</TableCell>
      </TableRow>
    </TableHead>
  );
};