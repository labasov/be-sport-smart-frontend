import { TableRow, TableCell, IconButton, Button } from "@mui/material";
import { ArrowsClockwise as ArrowsClockwiseIcon } from "@phosphor-icons/react/dist/ssr/ArrowsClockwise";
import { CaretDown as ExpandMoreIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { CaretUp as ExpandLessIcon } from "@phosphor-icons/react/dist/ssr/CaretUp";
import { Trash as TrashIcon } from "@phosphor-icons/react/dist/ssr/Trash";
import { enqueueSnackbar } from "notistack";
import React, { useState, forwardRef, useImperativeHandle, memo, useEffect } from "react";

import { useDynamicTranslation } from "../../hooks/UseTranslation";
import { SportDto } from "../../services/core-admin/interfaces/SportDto";
import { ConfirmationPopover } from "../common/ConfirmationPopover";

import SportFormula from "./SportFormula";
import SportVariablesTable from "./SportVariables/SportVariablesTable";

interface SportRowProps {
  sport: SportDto;
  handleVariableChange: (
    sportName: string,
    variableKey: string,
    variableValue: number
  ) => void;
  isSportOutOfSync: (sport: SportDto) => boolean;
  syncSport: (sport: SportDto) => Promise<void>;
  deleteSport: (sport: SportDto) => Promise<void>;
  switchSport: (sport: SportDto, isDisabled: boolean) => Promise<void>;
  updatedSports: React.MutableRefObject<{ [sportName: string]: Record<string, number> }>;
}

export interface SportRowRef {
  expand: () => void;
  collapse: () => void;
}

const SportRow = forwardRef<SportRowRef, SportRowProps>(({ sport, 
  handleVariableChange,
  isSportOutOfSync,
  syncSport,
  deleteSport,
  switchSport,
  updatedSports 
}, ref) => {
    const { t, i18n } = useDynamicTranslation();
    const [expanded, setExpanded] = useState(false);
    const [ isSportSyncAvailable, setIsSportSyncAvailable ] = useState(false);

    useEffect(() => {
      setIsSportSyncAvailable(isSportOutOfSync(sport));
    }, [sport]);

    const toggleExpand = () => {
      setExpanded((prev) => !prev);
    };

    useImperativeHandle(ref, () => ({
      expand: () => setExpanded(true),
      collapse: () => setExpanded(false),
    }));

    const handleSportSync = async () => {
      await syncSport(sport);
      setExpanded(true);
      enqueueSnackbar(`Sport ${sport.name} synced, check new variables.`, { variant: "success" });
    };

    const handleDelete = async () => {
      await deleteSport(sport);
      enqueueSnackbar(`Sport ${sport.name} deleted.`, { variant: "success" });
    }

    const handleSwitch = async () => {
      await switchSport(sport, !sport.disabled);
      enqueueSnackbar(`Sport ${sport.name} ${!sport.disabled ? 'disabled' : 'enabled'}.`, { variant: "success" });
    }

    const sportKey = `sports.${sport.name}.name`;

    return (
      <>
        <TableRow>
          <TableCell
            style={{
              padding: "8px 8px",
              backgroundColor: "var(--mui-palette-background-level1)",
            }}
          >
            <IconButton onClick={toggleExpand} sx={{ mr: 2 }}>
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            {sport.name + ' (' + (i18n.exists(sportKey) ? t(sportKey) : 'Localization not exist') + ')'}
          </TableCell>
          <TableCell
            style={{
              padding: "8px 8px",
              backgroundColor: "var(--mui-palette-background-level1)",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="small"
              disabled={!isSportSyncAvailable}
              onClick={handleSportSync}
              startIcon={
                <ArrowsClockwiseIcon />
              }
            >
              {isSportSyncAvailable ? 'Sync sport' : 'Up to date'}
            </Button>
            <Button
              sx={{ ml: 1 }}
              color={sport.disabled ? "success" : "secondary"}
              variant="contained"
              size="small"
              startIcon={
                <TrashIcon />
              }
              onClick={handleSwitch}
            >
              {sport.disabled ? 'Enable' : 'Disable'}
            </Button>
            <ConfirmationPopover
              onConfirm={handleDelete}
              message={`Are you sure you want to delete sport ${sport.name}?`}
            >
              <Button
                sx={{ ml: 1 }}
                color="error"
                startIcon={
                  <TrashIcon />
                }
                variant="contained"
                size="small"
              >
                Delete
              </Button>
            </ConfirmationPopover>
          </TableCell>
        </TableRow>
        <TableRow style={{ display: expanded ? "table-row" : "none" }}>
          <TableCell >
            <SportVariablesTable
              sport={sport}
              handleVariableChange={handleVariableChange}
              updatedSports={updatedSports}
            />
          </TableCell>
          <TableCell>
            <SportFormula sport={sport}/>
          </TableCell>
        </TableRow>
      </>
    );
  }
);

export default memo(SportRow);
