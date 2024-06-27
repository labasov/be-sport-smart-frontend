import React from 'react';
import { TableRow as MuiTableRow, TableCell, Chip } from '@mui/material';
import { ComputationResult } from '../../../services/core-service/interfaces';
import { Status, statusMap } from '../../../hooks/UseSortedSports';

interface SportTableRowProps {
  sport: ComputationResult;
  rankMap: Record<number, number>;
  getStatusByRank: (rank: number) => Status;
}

export const SportsTableRow: React.FC<SportTableRowProps> = ({ sport, rankMap, getStatusByRank }) => {
  const { result } = sport;
  const { label, color } = isNaN(result as any)
    ? statusMap.unknown
    : getStatusByRank(rankMap[result as number]);

  return (
    <MuiTableRow hover key={sport.name}>
      <TableCell>{sport.name}</TableCell>
      <TableCell>{isNaN(result as any) ? '-' : result}</TableCell>
      <TableCell>-</TableCell>
      <TableCell>
        <Chip color={color as any} label={label} size="small" />
      </TableCell>
    </MuiTableRow>
  );
};