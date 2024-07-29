import { TableRow, TableCell, Skeleton, Box } from '@mui/material';
import React from 'react';

export const SportRowSkeleton: React.FC = () => {
  return (
    <TableRow>
      <TableCell
        style={{
          padding: "8px 8px",
          backgroundColor: "var(--mui-palette-background-level1)",
        }}
      >
        <Skeleton variant="text" width={200} sx={{ml: 2}}/>
      </TableCell>
      <TableCell
        style={{
          padding: "8px 8px",
          backgroundColor: "var(--mui-palette-background-level1)",
        }}
      >
        <Box>
          <Skeleton variant="rounded" height={30} width={100} />
        </Box>
      </TableCell>
    </TableRow>
  );
};