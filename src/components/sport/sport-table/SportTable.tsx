import { CircularProgress, SxProps, Table, TableBody } from '@mui/material';
import React from 'react';

import { useSortedSports } from "../../../hooks/UseSortedSports";
import { ComputationResult } from "../../../services/core-service/interfaces";

import { SportTableHeader } from './SportTableHeader';
import { SportTableRow } from './SportTableRow';

interface SportTableProps {
  recordsLimit?: number;
  sx?: SxProps;
}

export const SportTable: React.FC<SportTableProps> = ({ recordsLimit, sx }) => {
  const { initialized, sports, rankMap, getStatusByRank } = useSortedSports();

  const displayedSports = recordsLimit ? sports.slice(0, recordsLimit) : sports;

  return (
    <Table sx={{ minWidth: 800, minHeight: 200, ...sx }}>
      <SportTableHeader />
      { !initialized && <CircularProgress /> 
      || <TableBody>
        {displayedSports.map((sport: ComputationResult) => (
          <SportTableRow
            key={sport.name}
            sport={sport}
            rankMap={rankMap}
            getStatusByRank={getStatusByRank}
          />
        ))}
      </TableBody>}
    </Table>
  );
};