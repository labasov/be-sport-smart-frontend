import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

import { ComputationResult } from '../services/core-service/interfaces';
import { useSportStore } from '../stores/SportStore';

import { useStaticTranslation } from './UseTranslation';

export type Status = {
  label: string;
  color: 'success' | 'warning' | 'info' | 'error' | 'default';
};

export type StatusMapType = {
  top1: Status;
  top2: Status;
  top3: Status;
  top4: Status;
  top5: Status;
  top6: Status;
  top7: Status;
  unknown: Status;
};

export type UseSortedSports = {
  sports: ComputationResult[];
  rankMap: Record<number, number>;
  loading: boolean;
  initialized: boolean;
  getStatusByRank: (score: number) => Status;
};

export const StatusMap: StatusMapType = {
  top1: { label: 'top1', color: 'success' },
  top2: { label: 'top2', color: 'info' },
  top3: { label: 'top3', color: 'info' },
  top4: { label: 'top4', color: 'warning' },
  top5: { label: 'top5', color: 'warning' },
  top6: { label: 'top6', color: 'default' },
  top7: { label: 'top7', color: 'error' },
  unknown: { label: 'unknown', color: 'default' },
} as const;

const calculateGroups = (sortedScores: number[]): number[] => {
  const jumps: number[] = [];

  for (let i = 1; i < sortedScores.length; i++) {
    jumps.push(sortedScores[i] - sortedScores[i - 1]);
  }

  const significantJumps = jumps.filter(jump => jump > 1); // Adjust threshold as needed

  const groupBoundaries = [sortedScores[0]];
  //let currentGroupSum = 0;
  //let currentGroupCount = 0;

  for (let i = 1; i < sortedScores.length; i++) {
    //currentGroupSum += jumps[i - 1];
    //currentGroupCount++;

    if (significantJumps.includes(jumps[i - 1])) {
      groupBoundaries.push(sortedScores[i]);
      //currentGroupSum = 0;
      //currentGroupCount = 0;
    }
  }

  groupBoundaries.push(sortedScores[sortedScores.length - 1]);
  return groupBoundaries;
};

const getStatusByRank = (score: number, groupBoundaries: number[]): Status => {
  if (isNaN(score)) return StatusMap.unknown;

  if (score < groupBoundaries[1]) return StatusMap.top1;
  if (groupBoundaries[2] && score < groupBoundaries[2]) return StatusMap.top2;
  if (groupBoundaries[3] && score < groupBoundaries[3]) return StatusMap.top3;
  if (groupBoundaries[4] && score < groupBoundaries[4]) return StatusMap.top4;
  if (groupBoundaries[5] && score < groupBoundaries[5]) return StatusMap.top5;
  if (groupBoundaries[6] && score < groupBoundaries[6]) return StatusMap.top6;

  return StatusMap.top7;
};

export const useRankedSports = (): UseSortedSports => {
  const { t } = useStaticTranslation();
  const { loading, initialized, sports } = useSportStore();
  const { enqueueSnackbar } = useSnackbar();
  const [sortedSports, setSortedSports] = useState<ComputationResult[]>([]);
  const [rankMap, setRankMap] = useState<Record<number, number>>({});
  const [groupBoundaries, setGroupBoundaries] = useState<number[]>([]);

  useEffect(() => {
    const previousTopSport = sortedSports[0];
    const validResults = sports.filter(sport => !isNaN(sport.result));
    const unknownResults = sports.filter(sport => isNaN(sport.result));

    validResults.sort((a, b) => a.result - b.result);

    const tempRankMap: Record<number, number> = {};
    let currentRank = 1;
    validResults.forEach((sport, index) => {
      if (index > 0 && sport.result !== validResults[index - 1].result) {
        currentRank++;
      }
      tempRankMap[sport.result] = currentRank;
    });

    // Calculate dynamic group boundaries based on significant jumps
    const sortedScores = validResults.map(sport => sport.result);
    const calculatedGroupBoundaries = calculateGroups(sortedScores);
    setGroupBoundaries(calculatedGroupBoundaries);

    setRankMap(tempRankMap);
    const newSortedSports = [...validResults, ...unknownResults];
    const newTopSport = newSortedSports[0];
    setSortedSports(newSortedSports);

    if (
      !!newTopSport && !isNaN(newTopSport.result) &&
      !!previousTopSport && !isNaN(previousTopSport.result) &&
      newTopSport.name !== previousTopSport.name
    ) {
      enqueueSnackbar(t("sport.rank.alerts.topSportUpdate"), { variant: "success" });
    }

  }, [sports]);

  return { 
    sports: sortedSports, 
    rankMap, 
    getStatusByRank: (score: number) => getStatusByRank(score, groupBoundaries), 
    loading, 
    initialized 
  };
};
