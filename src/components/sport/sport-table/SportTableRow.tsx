import { TableRow as MuiTableRow, TableCell, Chip } from '@mui/material';
import React from 'react';

import { Status, statusMap } from '../../../hooks/UseSortedSports';
import { ComputationResult } from '../../../services/core-service/interfaces';
import { useDynamicTranslation, useStaticTranslation } from '../../../hooks/UseTranslation';

interface SportTableRowProps {
  sport: ComputationResult;
  rankMap: Record<number, number>;
  getStatusByRank: (rank: number) => Status;
}

export const SportTableRow: React.FC<SportTableRowProps> = ({ sport, rankMap, getStatusByRank }) => {
  const { t } = useDynamicTranslation();
  const { t: tStatic } = useStaticTranslation();
  const { result } = sport;
  const { label, color } = isNaN(result as any)
    ? statusMap.unknown
    : getStatusByRank(rankMap[result as number]);

  return (
    <MuiTableRow hover key={sport.name}>
      <TableCell>{t(`sports.${sport.name}.name`)}</TableCell>
      <TableCell>{isNaN(result as any) ? '-' : result}</TableCell>
      <TableCell>-</TableCell>
      <TableCell>
        <Chip color={color as any} label={tStatic(`sport.table.labels.${label}`)} size="small" />
      </TableCell>
    </MuiTableRow>
  );
};