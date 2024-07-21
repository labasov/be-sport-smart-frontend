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
} from "@mui/material";
import { Minus as ExpandLessIcon } from "@phosphor-icons/react/dist/ssr/Minus";
import { Plus as ExpandMoreIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import React, { useEffect, useState, useCallback, memo, useRef } from "react";

import config from "../../config";
import { useDynamicTranslation } from "../../hooks/UseTranslation";
import { CoreAdminSportScoreService } from "../../services/core-admin-sport-score-service/CoreAdminSportScoreService";
import { SportScoreDto } from "../../services/core-admin-sport-score-service/interfaces/SportScoreDto";

import UpdateButton, { UpdateButtonRef } from "./UpdateButton";

const coreAdminSportScoreService = new CoreAdminSportScoreService(config.backend.baseUrl);

const SportScoreManageTable: React.FC = () => {
  const { t } = useDynamicTranslation();
  const [sportScores, setSportScores] = useState<SportScoreDto[]>([]);
  const [expandedSports, setExpandedSports] = useState<{ [key: string]: boolean }>({});
  const updatedScores = useRef<{ [key: string]: number }>({});
  const updateButtonRef = useRef<UpdateButtonRef>(null);

  useEffect(() => {
    coreAdminSportScoreService.getSportScores().then((data) => {
      setSportScores(data);
      const initialExpandedState = data.reduce((acc, sport) => {
        acc[sport.sportName] = false;
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
    const sportScoresToUpdate : SportScoreDto[] = [];
    const newScores = sportScores.map((sport, sportIndex) => {
      const updatedSportScoreData = { ...sport.sportScoreData };
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

    await coreAdminSportScoreService.updateSportScores(sportScoresToUpdate);

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
      sport: SportScoreDto;
      sportIndex: number;
      handleScoreChange: (sportIndex: number, scoreKey: string, value: number) => void;
      expanded: boolean;
      toggleExpand: () => void;
    }) => (
      <>
        <TableRow>
          <TableCell
            style={{
              padding: "8px",
              textAlign: "center",
              backgroundColor: "#f0f0f0", // Adjust this color as needed
            }}
            colSpan={3}
          >
            <IconButton onClick={toggleExpand} sx={{ mr: 2 }}>
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            {t(`sports.${sport.sportName}.name`)}
          </TableCell>
        </TableRow>
        {expanded &&
          Object.entries(sport.sportScoreData).map(([scoreKey, scoreValue]) => (
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
      prevProps.sport.sportName === nextProps.sport.sportName &&
      prevProps.sport.sportScoreData === nextProps.sport.sportScoreData &&
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
                key={sport.sportName}
                sport={sport}
                sportIndex={sportIndex}
                handleScoreChange={handleScoreChange}
                expanded={expandedSports[sport.sportName]}
                toggleExpand={() => toggleSportExpand(sport.sportName)}
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
