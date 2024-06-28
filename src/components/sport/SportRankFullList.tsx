import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import React, { useState } from 'react';

import { SportTable } from './sport-table/SportTable';
import { useStaticTranslation } from '../../hooks/UseTranslation';

interface FullSportListModalProps {
}

export const SportRankFullList: React.FC<FullSportListModalProps> = () => {
  const { t } = useStaticTranslation();
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
        {t('sport.table.fullList')}
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
          <SportTable/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
