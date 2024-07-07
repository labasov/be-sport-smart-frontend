import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

interface LoadingOverlayProps {
  open: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ open }) => {
  return (
    <Backdrop
      sx={{ 
        color: '#fff', 
        zIndex: (theme) => theme.zIndex.appBar - 1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};