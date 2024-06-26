import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { statusMap, useSortedSports } from '../../hooks/UseSortedSports';
import { ComputationResult } from '../../services/core-service/interfaces';
import { useMeasureValuesStore } from '../../stores/MeasureValuesStore';
import { useSportStore } from '../../stores/SportStore';
import { FullSportListModal } from './FullSportListModal';

export interface SportListProps {
  sx?: SxProps;
}

export function SportList({ sx }: SportListProps): React.JSX.Element {
  const { t } = useTranslation();
  const { measureValues } = useMeasureValuesStore();
  const { initialized, rankSports, sports } = useSportStore();
  const { sortedSports, rankMap, getStatusByRank } = useSortedSports(sports);

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
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Sport</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Important measures</TableCell>
              <TableCell>Recomendation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {sortedSports.map((sport: ComputationResult) => {
              const { result } = sport;
              const { label, color } = isNaN(result)
                ? statusMap.unknown
                : getStatusByRank(rankMap[result]);

              return (
                <TableRow hover key={sport.name}>
                  <TableCell>{sport.name}</TableCell>
                  <TableCell>{isNaN(result) ? '-' : result}</TableCell>
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
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FullSportListModal
          sports={sortedSports}
          rankMap={rankMap}
          getStatusByRank={getStatusByRank}
        />
      </CardActions>
    </Card>
  );
}

/*
export function SportList({ orders = [], sx }: LatestOrdersProps): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <Card sx={{ ...sx, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardHeader title={t('sport_list.title')} />
      <Divider />
      <Box sx={{ overflowX: 'auto', flexGrow: 1 }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell sortDirection="desc">Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              const { label, color } = statusMap[order.status] ?? { label: 'Unknown', color: 'default' };

              return (
                <TableRow hover key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer.name}</TableCell>
                  <TableCell>{dayjs(order.createdAt).format('MMM D, YYYY')}</TableCell>
                  <TableCell>
                    <Chip color={color} label={label} size="small" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          sx={{ marginRight: 1}}
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
}
*/