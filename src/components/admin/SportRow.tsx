import { TableRow, TableCell, IconButton } from "@mui/material";
import { CaretDown as ExpandMoreIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { CaretUp as ExpandLessIcon } from "@phosphor-icons/react/dist/ssr/CaretUp";
import React, { useState, forwardRef, useImperativeHandle, memo } from "react";

import { useDynamicTranslation } from "../../hooks/UseTranslation";
import { SportDto } from "../../services/core-admin/interfaces/SportDto";

import SportVariablesTable from "./SportVariables/SportVariablesTable";

interface SportRowProps {
  sport: SportDto;
  handleVariableChange: (
    sportName: string,
    variableKey: string,
    variableValue: number
  ) => void;
  updatedSports: React.MutableRefObject<{ [sportName: string]: Record<string, number> }>;
}

export interface SportRowRef {
  expand: () => void;
  collapse: () => void;
}

const SportRow = forwardRef<SportRowRef, SportRowProps>(
  ({ sport, handleVariableChange, updatedSports }, ref) => {
    const { t } = useDynamicTranslation();
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
      setExpanded((prev) => !prev);
    };

    useImperativeHandle(ref, () => ({
      expand: () => setExpanded(true),
      collapse: () => setExpanded(false),
    }));

    return (
      <>
        <TableRow>
          <TableCell
            style={{
              padding: "8px 8px",
              backgroundColor: "var(--mui-palette-background-level1)",
            }}
            colSpan={2}
          >
            <IconButton onClick={toggleExpand} sx={{ mr: 2 }}>
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            {t(`sports.${sport.name}.name`)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ display: expanded ? "block" : "none" }}>
            <SportVariablesTable
              sport={sport}
              handleVariableChange={handleVariableChange}
              updatedSports={updatedSports}
            />
          </TableCell>
        </TableRow>
      </>
    );
  }
);

export default memo(SportRow);
