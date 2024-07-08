import { TableHead, TableRow, TableCell } from '@mui/material';
import React from 'react';

import { useStaticTranslation } from '../../../hooks/UseTranslation';

export const SportTableHeader: React.FC = () => {
  const { t } = useStaticTranslation();
  return (
    <TableHead>
      <TableRow>
        <TableCell>{t('sport.table.header.sport')}</TableCell>
        <TableCell>{t('sport.table.header.recomendation')}</TableCell>
        <TableCell>{t('sport.table.header.score')}</TableCell>
        <TableCell>{t('sport.table.header.important')}</TableCell>
      </TableRow>
    </TableHead>
  );
};