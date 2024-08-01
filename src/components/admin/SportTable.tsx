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

import config from "../../config";
import { SportDto } from "../../services/core-admin/interfaces/SportDto";
import { SportManagerService } from "../../services/core-admin/SportManagerService";
import { LoadingOverlay } from "../common/LoadingOverlay";

import SportRow, { SportRowRef } from "./SportRow";
import { SportRowSkeleton } from "./SportRowSkeleton";
import Toolbar from "./Toolbar/Toolbar";
import UpdateButton, { UpdateButtonRef } from "./UpdateButton";

const sportManagerService = new SportManagerService(config.backend.baseUrl);

const SportTable: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sportTemplate, setSportTemplate] = useState<SportDto | null>(null);
  const [sports, setSports] = useState<SportDto[]>([]);
  const updatedSports = useRef<{ [sportName: string]: Record<string, number | string | boolean> }>(
    {}
  );
  const updateButtonRef = useRef<UpdateButtonRef>(null);
  const sportRowRefs = useRef<(SportRowRef | null)[]>([]);

  useEffect(() => {
    sportManagerService.getSports().then((sports) => {
      setSports(sports);
      setIsLoading(false);
    });
  }, []);

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

    const updatedSportsResult =
      await sportManagerService.updateSports(updatedSportsArray);
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
    const newSport = await sportManagerService.syncSport(sport);
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

  const handleSportCreate = (sport: SportDto) => {
    const newSports = [sport, ...sports];
    setSports(newSports);
  };

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
        handleExpandAll={handleExpandAll}
        handleCollapseAll={handleCollapseAll}
        onSportCreate={handleSportCreate}
        onSportTemplateReady={setSportTemplate}
      />
      <TableContainer component={Paper} sx={{ position: "relative" }}>
        <LoadingOverlay open={isLoading} />
        <Table>
          <TableHead>
            <TableRow>
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
