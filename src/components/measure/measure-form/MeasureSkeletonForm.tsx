import { Box, Skeleton, Typography } from '@mui/material';
import React from 'react';

export const MeasureSkeletonForm: React.FC = () => {
  return (
    <>
      <Typography variant="h2">
        <Skeleton width="40%" />
      </Typography>
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="85%" />
      <Skeleton variant="text" width="80%" />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
        <Skeleton variant="rounded" width="60%" height={40} sx={{ marginRight: 2 }} />
        <Skeleton variant="rounded" width={100} height={40} />
      </Box>
    </>
  );
};