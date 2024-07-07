import { TableRow, TableCell, Skeleton } from '@mui/material';
import React from 'react';

export const TableSkeletonRow: React.FC = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton variant="text"  />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" />
      </TableCell>
    </TableRow>
  );
};