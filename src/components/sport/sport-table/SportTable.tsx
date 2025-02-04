import { SxProps, Table, TableBody } from "@mui/material";
import React from "react";

import { useRankedSports } from "../../../hooks/UseRankedSports";
import { ComputationResult } from "../../../services/core-service/interfaces";

import { SportTableHeader } from "./SportTableHeader";
import { SportTableRow } from "./SportTableRow";
import { TableSkeletonRow } from "./TableSkeletonRow";

interface SportTableProps {
  recordsLimit?: number;
  sx?: SxProps;
}

export const SportTable: React.FC<SportTableProps> = ({ recordsLimit, sx }) => {
  const { initialized, sports, rankMap, getStatusByRank } =
    useRankedSports();
  const displayedSports = recordsLimit ? sports.slice(0, recordsLimit) : sports;

  return (
    <Table sx={{ minWidth: 800, minHeight: 200, ...sx }}>
      <SportTableHeader />
      {(!initialized && (
        <>
          <TableSkeletonRow />
          <TableSkeletonRow />
          <TableSkeletonRow />
        </>
      )) || (
        <TableBody>
          {displayedSports.map((sport: ComputationResult) => (
            <SportTableRow
              key={sport.name}
              sport={sport}
              rankMap={rankMap}
              getStatusByRank={getStatusByRank}
            />
          ))}
        </TableBody>
      )}
    </Table>
  );
};
