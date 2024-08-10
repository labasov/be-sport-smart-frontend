import { TableRow, TableCell, Skeleton, Box, Checkbox, styled } from '@mui/material';
import React from 'react';

const NarrowTableCell = styled(TableCell)({
  paddingTop: "8px",
  paddingBottom: "8px",
  backgroundColor: "var(--mui-palette-background-level1)",
});

export const SportRowSkeleton: React.FC = () => {
  return (
    <TableRow>
      <NarrowTableCell>
        <Checkbox disabled />
      </NarrowTableCell>
      <NarrowTableCell>
      </NarrowTableCell>
      <NarrowTableCell>
        <Skeleton variant="text" width={200} sx={{ml: 2}}/>
      </NarrowTableCell>
      <NarrowTableCell>
        <Box>
          <Skeleton variant="rounded" height={30} width={100} />
        </Box>
      </NarrowTableCell>
    </TableRow>
  );
};