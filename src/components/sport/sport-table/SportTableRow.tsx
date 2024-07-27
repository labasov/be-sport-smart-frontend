import { TableRow, TableCell, Chip } from '@mui/material';
import React from 'react';

import { Status, StatusMap } from '../../../hooks/UseRankedSports';
import { useDynamicTranslation, useStaticTranslation } from '../../../hooks/UseTranslation';
import { ComputationResult } from '../../../services/core-service/interfaces';

interface SportTableRowProps {
  sport: ComputationResult;
  rankMap: Record<number, number>;
  getStatusByRank: (rank: number) => Status;
}

export const SportTableRow: React.FC<SportTableRowProps> = ({ sport, getStatusByRank }) => {
  const { t } = useDynamicTranslation();
  const { t: tStatic } = useStaticTranslation();
  const { result } = sport;
  const { label, color } = isNaN(result)
    ? StatusMap.unknown
    : getStatusByRank(result);

  return (
    <TableRow hover key={sport.name}>
      <TableCell>{t(`sports.${sport.name}.name`)}</TableCell>
      <TableCell>
        <Chip color={color} label={tStatic(`sport.table.labels.${label}`)} size="small" />
      </TableCell>
      <TableCell>{isNaN(result) ? '-' : result.toFixed(2)}</TableCell>
      <TableCell>-</TableCell>
    </TableRow>
  );
};