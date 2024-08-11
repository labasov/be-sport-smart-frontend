import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React, { useEffect, useState, useCallback, useRef } from "react";

import config from "../../../config";
import { ComputationType } from "../../../services/core-admin/interfaces/ComputationType";
import { SportDto } from "../../../services/core-admin/interfaces/SportDto";
import { SportManagerService } from "../../../services/core-admin/SportManagerService";
import { LoadingOverlay } from "../../common/LoadingOverlay";

import { CheckAll, CheckAllRef } from "./CheckAll";
import SportRow, { SportRowRef } from "./SportRow";
import { SportRowSkeleton } from "./SportRowSkeleton";
import Toolbar, { ToolbarRef } from "./toolbar/Toolbar";
import UpdateButton, { UpdateButtonRef } from "./UpdateButton";

const sportManagerService = new SportManagerService(config.backend.baseUrl);

const SportTable: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [computationType, setComputationType] = useState<ComputationType>(ComputationType.Sport);
  const [sportTemplate, setSportTemplate] = useState<SportDto | null>(null);
  const [sports, setSports] = useState<SportDto[]>([]);
  const updatedSports = useRef<{ [sportName: string]: Record<string, number | string | boolean> }>(
    {}
  );
  const selectedSports = useRef<SportDto[]>([]);
  const toolbarRef = useRef<ToolbarRef>(null);
  const updateButtonRef = useRef<UpdateButtonRef>(null);
  const checkAllRef = React.useRef<CheckAllRef>(null);
  const sportRowRefs = useRef<(SportRowRef | null)[]>([]);

  useEffect(() => {
    setIsLoading(true);
    selectedSports.current = [];
    checkAllRef.current?.onToggleSportsSelection(0);
    toolbarRef.current?.onSportSelectionChange(0);

    sportManagerService.getSports(computationType).then((sports) => {
      setSports(sports);
      setIsLoading(false);
    });
  }, [computationType]);

  const handleVariableChange = useCallback(
    (sportName: string, variableKey: string, variableValue: number | string | boolean) => {
      if (updatedSports.current[sportName] === undefined) {
        updatedSports.current[sportName] = {};
      }

      updatedSports.current[sportName][variableKey] = variableValue;

      updateButtonRef.current?.updateCount(
        Object.keys(updatedSports.current).length
      );
    },
    []
  );

  const handleApply = async () => {
    setIsLoading(true);
    const updatedSportsArray = Object.keys(updatedSports.current).map(
      (name) => ({
        name,
        variables: updatedSports.current[name],
      })
    );

    const updatedSportsResult = await sportManagerService.updateSports(updatedSportsArray);
    const newSports = sports.map((sport) => {
      const updatedSport = updatedSportsResult.find(
        (s) => s.name === sport.name
      );
      return updatedSport ? updatedSport : sport;
    });

    setSports(newSports);
    updatedSports.current = {};
    updateButtonRef.current?.updateCount(0);

    setIsLoading(false);
  };

  const handleSyncSport = async (sport: SportDto) => {
    setIsLoading(true);
    const newSport = (await sportManagerService.syncSports([sport.name]))[0];
    const newSports = sports.map((s) =>
      s.name === newSport.name ? newSport : s
    );
    setSports(newSports);
    setIsLoading(false);
  };

  const handleDeleteSport = async (sport: SportDto) => {
    setIsLoading(true);
    await sportManagerService.deleteSport(sport);
    const newSports = sports.filter((s) => s.name !== sport.name);
    setSports(newSports);
    setIsLoading(false);
  };

  const handleExpandAll = useCallback(() => {
    sportRowRefs.current.forEach((ref) => ref?.expand());
  }, []);

  const handleCollapseAll = useCallback(() => {
    sportRowRefs.current.forEach((ref) => ref?.collapse());
  }, []);

  const handleSelectAll = useCallback((isSelected: boolean) => {
    sportRowRefs.current.forEach((ref) => ref?.select(isSelected));
  }, []);

  const handleSportCreate = (sport: SportDto) => {
    const newSports = [sport, ...sports];
    setSports(newSports);
  };

  const handleSportsUpdate = (updatedSports: SportDto[]) => {
    const newSports = sports.map((sport) => {
      const updatedSport = updatedSports.find((s) => s.name === sport.name);
      return updatedSport ? updatedSport : sport;
    });

    setSports(newSports);
    handleSelectAll(false);
  };

  const handleComputationTypeSelect = (computationType: ComputationType) => {
    setSports([]);
    setComputationType(computationType);
  }

  const handleSwitchSport = async (sport: SportDto, isDisabled: boolean) => {
    setIsLoading(true);
    const updatedSport = { ...sport, disabled: isDisabled };
    await sportManagerService.updateSports([updatedSport]);
    const newSports = sports.map((s) =>
      s.name === sport.name ? updatedSport : s
    );
    setSports(newSports);
    setIsLoading(false);
  };

  const handleSelectSport = (sport: SportDto, checked?: boolean) => {
    if (selectedSports.current.includes(sport)) {
      if (checked === undefined || checked === false) {
        selectedSports.current = selectedSports.current.filter(
          (s) => s.name !== sport.name
        );
      }
    } else if (checked === undefined || checked === true) {
      selectedSports.current = [...selectedSports.current, sport];
    }

    checkAllRef.current?.onToggleSportsSelection(selectedSports.current.length);
    toolbarRef.current?.onSportSelectionChange(selectedSports.current.length);
  };

  const isSportOutOfSync = useCallback(
    (sport: SportDto) => {
      if (!sportTemplate || !sportTemplate.variables) {
        return false;
      }

      const templateKeys = Object.keys(sportTemplate.variables);
      const allKeysPresent = templateKeys.every((key) =>
        // eslint-disable-next-line no-prototype-builtins
        sport.variables.hasOwnProperty(key)
      );

      return !allKeysPresent;
    },
    [sportTemplate]
  );

  return (
    <>
      <Toolbar
        ref={toolbarRef}
        handleExpandAll={handleExpandAll}
        handleCollapseAll={handleCollapseAll}
        onSportCreate={handleSportCreate}
        onSportsUpdate={handleSportsUpdate}
        onSportTemplateReady={setSportTemplate}
        onComputationTypeSelect={handleComputationTypeSelect}
        isSportOutOfSync={isSportOutOfSync}
        selectedSports={selectedSports}
      />
      <TableContainer component={Paper} sx={{ position: "relative" }}>
        <LoadingOverlay open={isLoading} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <CheckAll
                  ref={checkAllRef}
                  computationType={sports[0]?.type || ComputationType.Sport}
                  sportCount={sports.length}
                  selectAll={handleSelectAll}
                />
              </TableCell>
              <TableCell>
                Collapse/ Expand
              </TableCell>
              <TableCell>Sport Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <>
                <SportRowSkeleton />
                <SportRowSkeleton />
                <SportRowSkeleton />
              </>
            )}
            {sports.map((sport, sportIndex) => (
              <SportRow
                key={sport.name}
                ref={(ref) => (sportRowRefs.current[sportIndex] = ref)}
                sport={sport}
                handleVariableChange={handleVariableChange}
                isSportOutOfSync={isSportOutOfSync}
                syncSport={handleSyncSport}
                deleteSport={handleDeleteSport}
                switchSport={handleSwitchSport}
                selectSport={handleSelectSport}
                updatedSports={updatedSports}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UpdateButton ref={updateButtonRef} apply={handleApply} />
    </>
  );
};

export default SportTable;
