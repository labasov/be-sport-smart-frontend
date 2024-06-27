import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import * as React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useMeasureValuesStore } from '../../stores/MeasureValuesStore';
import { useSportStore } from '../../stores/SportStore';
import { FullSportListModal } from './SportsFullListModal';
import { SportsTableComponent } from './sports-table/SportsTable';

const sportsDisplayLimit = 8;

export interface SportListProps {
  sx?: SxProps;
}

export function SportsCard({ sx }: SportListProps): React.JSX.Element {
  const { t } = useTranslation();
  const { measureValues } = useMeasureValuesStore();
  const { initialized, rankSports } = useSportStore();

  useEffect(() => {
    if (!initialized) {
      rankSports(measureValues);
    }
  }, []);

  return (
    <Card sx={{ ...sx, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardHeader title={t('sport_list.title')} />
      <Divider />
      <Box sx={{ overflowX: 'auto', flexGrow: 1 }}>
        <SportsTableComponent recordsLimit={sportsDisplayLimit}/>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FullSportListModal />
      </CardActions>
    </Card>
  );
}
