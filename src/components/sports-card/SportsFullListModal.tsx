import React, { useState } from 'react';
import { Modal, Box, Typography, Divider, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { X as CloseIcon } from '@phosphor-icons/react/dist/ssr/X';
import { SportsTableComponent } from './sports-table/SportsTable';

interface FullSportListModalProps {
}

export const FullSportListModal: React.FC<FullSportListModalProps> = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        color="inherit"
        endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
        size="small"
        sx={{ marginRight: 1}}
        variant="text"
        onClick={handleOpen}
      >
        View all
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={true}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">Full Sport List</DialogTitle>
        <DialogContent dividers={true} sx={{ p: 0 }}>
          <SportsTableComponent/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
