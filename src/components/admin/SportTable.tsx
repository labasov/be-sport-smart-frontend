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
import Toolbar from "./Toolbar/Toolbar";
import UpdateButton, { UpdateButtonRef } from "./UpdateButton";


const sportManagerService = new SportManagerService(config.backend.baseUrl);

const SportTable: React.FC = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [sports, setSports] = useState<SportDto[]>([]);
  const updatedSports = useRef<{ [sportName: string]: Record<string, number> }>({});
  const updateButtonRef = useRef<UpdateButtonRef>(null);
  const sportRowRefs = useRef<(SportRowRef | null)[]>([]);

  useEffect(() => {
    sportManagerService.getSports().then((sports) => {
      setSports(sports);
      setIsLoading(false);
    });
  }, []);

  const handleVariableChange = useCallback(
    (sportName: string, variableKey: string, variableValue: number) => {
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
    const updatedSportsArray = Object.keys(updatedSports.current).map(name => ({
      name,
      variables: updatedSports.current[name]
    }));

    const newSports = sports.map((sport) => {
      const updatedSport = updatedSportsArray.find((s) => s.name === sport.name);
      if (updatedSport) {
        return { 
          ...sport, 
          variables: { 
            ...sport.variables, 
            ...updatedSport.variables 
          } 
        };
      }
      return sport;
    });

    await sportManagerService.updateSports(updatedSportsArray);

    setSports(newSports);
    updatedSports.current = {};
    updateButtonRef.current?.updateCount(0);

    setIsLoading(false);
  };

  const handleExpandAll = useCallback(() => {
    sportRowRefs.current.forEach((ref) => ref?.expand());
  }, []);

  const handleCollapseAll = useCallback(() => {
    sportRowRefs.current.forEach((ref) => ref?.collapse());
  }, []);

  const handleCreate = useCallback(() => {
    setIsLoading(true);
    console.log("Create");
  }, []);

  return (
    <>
      <Toolbar
        handleExpandAll={handleExpandAll}
        handleCollapseAll={handleCollapseAll}
        handleCreate={handleCreate}
      />
      <TableContainer component={Paper} sx={{position: 'relative'}}>
        <LoadingOverlay open={isLoading} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sport Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sports.map((sport, sportIndex) => (
              <SportRow
                key={sport.name}
                ref={(ref) => (sportRowRefs.current[sportIndex] = ref)}
                sport={sport}
                //sportIndex={sportIndex}
                handleVariableChange={handleVariableChange}
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
