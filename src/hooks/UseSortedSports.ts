import { useEffect, useState } from 'react';

import { ComputationResult } from '../services/core-service/interfaces';

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

export const statusMap: StatusMap  = {
  recommended: { label: 'Recommended', color: 'success' },
  neutral: { label: 'Possible', color: 'warning' },
  notRecommended: { label: 'Not recommended', color: 'error' },
  unknown: { label: 'Unknown', color: 'default' },
} as const;

const getStatusByRank = (rank: number): Status => {
  if (isNaN(rank)) return statusMap.unknown;

  if (rank <= 1) return statusMap.recommended;
  if (rank <= 2) return statusMap.neutral;

  return statusMap.notRecommended;
};

export const useSortedSports = (sports: ComputationResult[]) => {
  const [sortedSports, setSortedSports] = useState<ComputationResult[]>([]);
  const [rankMap, setRankMap] = useState<Record<number, number>>({});

  useEffect(() => {
    const validResults = sports.filter(sport => !isNaN(sport.result as any));
    const unknownResults = sports.filter(sport => isNaN(sport.result as any));

    validResults.sort((a, b) => (a.result as any) - (b.result as any));

    const tempRankMap: Record<number, number> = {};
    let currentRank = 1;
    validResults.forEach((sport, index) => {
      if (index > 0 && sport.result !== validResults[index - 1].result) {
        currentRank++;
      }
      tempRankMap[sport.result] = currentRank;
    });

    setRankMap(tempRankMap);
    setSortedSports([...validResults, ...unknownResults]);
  }, [sports]);

  return { sortedSports, rankMap, getStatusByRank };
};