import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

import { ComputationResult } from '../services/core-service/interfaces';
import { useSportStore } from '../stores/SportStore';

import { useStaticTranslation } from './UseTranslation';

export type Status = {
  label: string;
  color: 'success' | 'warning' | 'error' | 'default';
};

export type StatusMap = {
  recommended: Status;
  neutral: Status;
  notRecommended: Status;
  unknown: Status;
};

export type UseSortedSports = {
  sports: ComputationResult[];
  rankMap: Record<number, number>;
  getStatusByRank: (rank: number) => Status;
};

export const statusMap: StatusMap = {
  recommended: { label: 'recommended', color: 'success' },
  neutral: { label: 'possible', color: 'warning' },
  notRecommended: { label: 'not_recommended', color: 'error' },
  unknown: { label: 'unknown', color: 'default' },
} as const;

const getStatusByRank = (rank: number): Status => {
  if (isNaN(rank)) return statusMap.unknown;

  if (rank <= 1) return statusMap.recommended;
  if (rank <= 2) return statusMap.neutral;

  return statusMap.notRecommended;
};

export const useSortedSports = (): UseSortedSports => {
  const { t } = useStaticTranslation();
  const { sports } = useSportStore();
  const { enqueueSnackbar } = useSnackbar();
  const [sortedSports, setSortedSports] = useState<ComputationResult[]>([]);
  const [rankMap, setRankMap] = useState<Record<number, number>>({});

  useEffect(() => {
    const previousTopSport = sortedSports[0];
    const validResults = sports.filter(sport => !isNaN(sport.result));
    const unknownResults = sports.filter(sport => isNaN(sport.result));

    validResults.sort((a, b) => (a.result) - (b.result));

    const tempRankMap: Record<number, number> = {};
    let currentRank = 1;
    validResults.forEach((sport, index) => {
      if (index > 0 && sport.result !== validResults[index - 1].result) {
        currentRank++;
      }
      tempRankMap[sport.result] = currentRank;
    });

    setRankMap(tempRankMap);
    const newSortedSports = [...validResults, ...unknownResults];
    const newTopSport = newSortedSports[0];
    setSortedSports(newSortedSports);

    if (!!newTopSport && !isNaN(newTopSport.result)
      && !!previousTopSport && !isNaN(previousTopSport.result)
      && newTopSport.name !== previousTopSport.name ) {
      enqueueSnackbar(t("sport.rank.alerts.topSportUpdate"), { variant: "success" });
    }

  }, [sports]);

  return { sports: sortedSports, rankMap, getStatusByRank };
};