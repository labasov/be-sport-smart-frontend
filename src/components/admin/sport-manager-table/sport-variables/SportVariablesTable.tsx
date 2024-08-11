import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Chip,
} from "@mui/material";
import React from "react";

import { SportDto } from "../../../../services/core-admin/interfaces/SportDto";

import SportVariablesRow from "./SportVariablesRow";

interface SportVariablesTableProps {
  sport: SportDto;
  handleVariableChange: (
    sportName: string,
    variableKey: string,
    variableValue: number | string | boolean
  ) => void;
  updatedSports: React.MutableRefObject<{
    [sportName: string]: Record<string, number | string | boolean>;
  }>;
}

const SportVariablesTable: React.FC<SportVariablesTableProps> = ({
  sport,
  handleVariableChange,
  updatedSports,
}) => {

  const hasVariables = Object.keys(sport.variables).length > 0;

   return (
    <>
      {hasVariables ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Variable</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(sport.variables).map(
                ([variableKey, variableValue]) => (
                  <SportVariablesRow
                    key={variableKey}
                    variableKey={variableKey}
                    variableValue={
                      updatedSports.current[sport.name] &&
                      updatedSports.current[sport.name][variableKey] !==
                        undefined
                        ? updatedSports.current[sport.name][variableKey]
                        : variableValue
                    }
                    onChange={(newValue) =>
                      handleVariableChange(sport.name, variableKey, newValue)
                    }
                  />
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <Chip label="No variables" />
        </Box>
      )}
    </>
  );
};

export default SportVariablesTable;
