import { TableRow, TableCell, TextField, styled } from "@mui/material";
import React, { useEffect, useState, memo } from "react";

interface SportVariablesRowProps {
  variableKey: string;
  variableValue: number;
  onChange: (variableValue: number) => void;
}

const StyledTableCell = styled(TableCell)({
  padding: '8px 8px',
});

const SportVariablesRow: React.FC<SportVariablesRowProps> = memo(
  ({ variableKey, variableValue, onChange }) => {
    const [localValue, setLocalValue] = useState(variableValue);

    useEffect(() => {
      setLocalValue(variableValue);
    }, [variableValue]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(event.target.value);
      onChange(value);
      setLocalValue(value);
    };

    return (
      <TableRow>
        <StyledTableCell>{variableKey}</StyledTableCell>
        <StyledTableCell>
          <TextField
            type="number"
            value={localValue}
            onChange={handleChange}
            variant="outlined"
            size="small"
            InputProps={{
              style: { height: "30px" },
              inputProps: { step: "any" },
            }}
          />
        </StyledTableCell>
      </TableRow>
    );
  },
  (prevProps, nextProps) =>
    prevProps.variableValue === nextProps.variableValue && prevProps.variableKey === nextProps.variableKey
);

export default SportVariablesRow;
