import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React from "react";

import { SportDto } from "../../../services/core-admin/interfaces/SportDto";

import SportVariablesRow from "./SportVariablesRow";

interface SportVariablesTableProps {
  sport: SportDto;
  //sportIndex: number;
  handleVariableChange: (
    sportName: string,
    variableKey: string,
    variableValue: number
  ) => void;
  updatedSports: React.MutableRefObject<{ [sportName: string]: Record<string, number> }>;
}

const SportVariablesTable: React.FC<SportVariablesTableProps> = ({
  sport,
  //sportIndex,
  handleVariableChange,
  updatedSports,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Variable</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(sport.variables).map(([variableKey, variableValue]) => (
            <SportVariablesRow
              key={variableKey}
              variableKey={variableKey}
              variableValue={!!updatedSports.current[sport.name] && !!updatedSports.current[sport.name][variableKey] ? updatedSports.current[sport.name][variableKey] : variableValue}
              onChange={(variableValue) => handleVariableChange(sport.name, variableKey, variableValue)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SportVariablesTable;
