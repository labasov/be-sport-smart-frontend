import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  IconButton,
  Box,
  Checkbox,
} from "@mui/material";
import { Minus as ExpandLessIcon } from "@phosphor-icons/react/dist/ssr/Minus";
import { Plus as ExpandMoreIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import React, { useEffect, useState, useCallback, memo, useRef } from "react";

import config from "../../config";
import { useDynamicTranslation } from "../../hooks/UseTranslation";
import { SportDto } from "../../services/core-admin/interfaces/SportDto";
import { SportManagerService } from "../../services/core-admin/SportManagerService";

import UpdateButton, { UpdateButtonRef } from "./UpdateButton";

const coreAdminSportScoreService = new SportManagerService(config.backend.baseUrl);

const SportScoreManageTable: React.FC = () => {
  const { t } = useDynamicTranslation();
  const [sportScores, setSportScores] = useState<SportDto[]>([]);
  const [expandedSports, setExpandedSports] = useState<{ [key: string]: boolean }>({});
  const updatedScores = useRef<{ [key: string]: number }>({});
  const updateButtonRef = useRef<UpdateButtonRef>(null);

  useEffect(() => {
    coreAdminSportScoreService.getSports().then((data) => {
      setSportScores(data);
      const initialExpandedState = data.reduce((acc, sport) => {
        acc[sport.name] = false;
        return acc;
      }, {} as { [key: string]: boolean });
      setExpandedSports(initialExpandedState);
    });
  }, []);

  const handleScoreChange = useCallback((sportIndex: number, scoreKey: string, scoreValue: number) => {
    const key = `${sportIndex}-${scoreKey}`;
    updatedScores.current[key] = scoreValue;
    updateButtonRef.current?.updateCount(Object.keys(updatedScores.current).length);
  }, []);

  const handleApply = useCallback(async () => {
    const sportScoresToUpdate : SportDto[] = [];
    const newScores = sportScores.map((sport, sportIndex) => {
      const updatedSportScoreData = { ...sport.variables };
      let sportUpdated = false;
      Object.entries(updatedSportScoreData).forEach(([scoreKey]) => {
        const key = `${sportIndex}-${scoreKey}`;
        if (updatedScores.current[key] !== undefined) {
          updatedSportScoreData[scoreKey] = updatedScores.current[key];
          sportUpdated = true;
        }
      });

      const updatedSport = {
        ...sport,
        sportScoreData: updatedSportScoreData,
      };

      if (sportUpdated) {
        sportScoresToUpdate.push(updatedSport);
      }

      return updatedSport;
    });

    await coreAdminSportScoreService.updateSports(sportScoresToUpdate);

    setSportScores(newScores);
    updatedScores.current = {};
    updateButtonRef.current?.updateCount(0);
  }, [sportScores]);

  const handleExpandAll = useCallback(() => {
    const newExpandedState = Object.keys(expandedSports).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as { [key: string]: boolean });
    setExpandedSports(newExpandedState);
  }, [expandedSports]);

  const handleCollapseAll = useCallback(() => {
    const newExpandedState = Object.keys(expandedSports).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {} as { [key: string]: boolean });
    setExpandedSports(newExpandedState);
  }, [expandedSports]);

  const toggleSportExpand = useCallback((sportName: string) => {
    setExpandedSports((prev) => ({
      ...prev,
      [sportName]: !prev[sportName],
    }));
  }, []);

  const MemoizedTableRow = memo(
    ({
      scoreKey,
      scoreValue,
      onBlur,
    }: {
      sportIndex: number;
      scoreKey: string;
      scoreValue: number;
      onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    }) => {
      const [localValue, setLocalValue] = useState(scoreValue);

      useEffect(() => {
        setLocalValue(scoreValue);
      }, [scoreValue]);

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(parseFloat(event.target.value));
      };

      return (
        <TableRow>
          <TableCell />
          <TableCell style={{ padding: "8px" }}>{scoreKey}</TableCell>
          <TableCell style={{ padding: "8px" }}>
            <TextField
              type="number"
              value={localValue}
              onChange={handleChange}
              onBlur={onBlur}
              variant="outlined"
              size="small"
              InputProps={{
                style: { height: "30px" },
                inputProps: { step: "any" },
              }}
            />
          </TableCell>
        </TableRow>
      );
    },
    (prevProps, nextProps) =>
      prevProps.scoreValue === nextProps.scoreValue && prevProps.scoreKey === nextProps.scoreKey
  );

  const MemoizedSportRow = memo(
    ({
      sport,
      sportIndex,
      handleScoreChange,
      expanded,
      toggleExpand,
    }: {
      sport: SportDto;
      sportIndex: number;
      handleScoreChange: (sportIndex: number, scoreKey: string, value: number) => void;
      expanded: boolean;
      toggleExpand: () => void;
    }) => (
      <>
        <TableRow>
          <TableCell
            style={{
              padding: "8px 8px",
              backgroundColor: "#f0f0f0", // Adjust this color as needed
            }}
            colSpan={3}
          >
            <Checkbox
              
            />
            <IconButton onClick={toggleExpand} sx={{ mr: 2 }}>
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            {t(`sports.${sport.name}.name`)}
          </TableCell>
        </TableRow>
        {expanded &&
          Object.entries(sport.variables).map(([scoreKey, scoreValue]) => (
            <MemoizedTableRow
              key={scoreKey}
              sportIndex={sportIndex}
              scoreKey={scoreKey}
              scoreValue={updatedScores.current[`${sportIndex}-${scoreKey}`] ?? scoreValue}
              onBlur={(e) => handleScoreChange(sportIndex, scoreKey, parseFloat(e.target.value))}
            />
          ))}
      </>
    ),
    (prevProps, nextProps) =>
      prevProps.sport.name === nextProps.sport.name &&
      prevProps.sport.variables === nextProps.sport.variables &&
      prevProps.expanded === nextProps.expanded
  );

  return (
    <>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button variant="contained" color="primary" onClick={handleExpandAll}>
          Expand All
        </Button>
        <Button variant="contained" color="primary" onClick={handleCollapseAll}>
          Collapse All
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sport Name</TableCell>
              <TableCell>Variable</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sportScores.map((sport, sportIndex) => (
              <MemoizedSportRow
                key={sport.name}
                sport={sport}
                sportIndex={sportIndex}
                handleScoreChange={handleScoreChange}
                expanded={expandedSports[sport.name]}
                toggleExpand={() => toggleSportExpand(sport.name)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UpdateButton
        ref={updateButtonRef}
        apply={handleApply}
      />
    </>
  );
};

export default SportScoreManageTable;
