import { SxProps, Table, TableBody } from '@mui/material';
import React from 'react';

import { useSortedSports } from "../../../hooks/UseSortedSports";
import { ComputationResult } from "../../../services/core-service/interfaces";
import { useSportStore } from '../../../stores/SportStore';

import { SportTableHeader } from './SportTableHeader';
import { SportTableRow } from './SportTableRow';

interface SportTableProps {
  recordsLimit?: number;
  sx?: SxProps;
}

export const SportTable: React.FC<SportTableProps> = ({ recordsLimit, sx }) => {
  const { sports } = useSportStore();
  const { sortedSports, rankMap, getStatusByRank } = useSortedSports(sports);

  const displayedSports = recordsLimit ? sortedSports.slice(0, recordsLimit) : sortedSports;

  return (
    <Table sx={{ minWidth: 800, ...sx }}>
      <SportTableHeader />
      <TableBody>
        {displayedSports.map((sport: ComputationResult) => (
          <SportTableRow
            key={sport.name}
            sport={sport}
            rankMap={rankMap}
            getStatusByRank={getStatusByRank}
          />
        ))}
      </TableBody>
    </Table>
  );
};