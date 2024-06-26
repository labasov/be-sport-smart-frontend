import React, { useState } from 'react';
import { Modal, Box, Typography, Divider, Table, TableHead, TableRow, TableCell, TableBody, Chip, Button } from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { ComputationResult } from '../../services/core-service/interfaces';
import { statusMap, useSortedSports } from '../../hooks/UseSortedSports';
import { useSportStore } from '../../stores/SportStore';

interface FullSportListModalProps {
}

export const FullSportListModal: React.FC<FullSportListModalProps> = () => {
  const { sports } = useSportStore();
  const { sortedSports, rankMap, getStatusByRank } = useSortedSports(sports);

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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Full Sport List
          </Typography>
          <Divider />
          <Table sx={{ minWidth: 800, mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell>Sport</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Important measures</TableCell>
                <TableCell>Recommendation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedSports.map((sport: ComputationResult) => {
                const { result } = sport;
                const { label, color } = isNaN(result as any)
                  ? statusMap.unknown
                  : getStatusByRank(rankMap[result as number]);

                return (
                  <TableRow hover key={sport.name}>
                    <TableCell>{sport.name}</TableCell>
                    <TableCell>{isNaN(result as any) ? '-' : result}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <Chip color={color as any} label={label} size="small" />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Modal>
    </>
  );
};
