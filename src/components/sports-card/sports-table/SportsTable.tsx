import React from 'react';
import { SxProps, Table, TableBody } from '@mui/material';
import { useSortedSports } from "../../../hooks/UseSortedSports";
import { ComputationResult } from "../../../services/core-service/interfaces";
import { SportsTableHeader } from './SportsTableHeader';
import { SportsTableRow } from './SportsTableRow';
import { useSportStore } from '../../../stores/SportStore';

interface SportsTableComponentProps {
  recordsLimit?: number;
  sx?: SxProps;
}

export const SportsTableComponent: React.FC<SportsTableComponentProps> = ({ recordsLimit, sx }) => {
  const { sports } = useSportStore();
  const { sortedSports, rankMap, getStatusByRank } = useSortedSports(sports);

  const displayedSports = recordsLimit ? sortedSports.slice(0, recordsLimit) : sortedSports;

  return (
    <Table sx={{ minWidth: 800, ...sx }}>
      <SportsTableHeader />
      <TableBody>
        {displayedSports.map((sport: ComputationResult) => (
          <SportsTableRow
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