import { TableRow, TableCell, TextField, styled } from "@mui/material";
import React, { useEffect, useState, memo } from "react";

interface SportVariablesRowProps {
  variableKey: string;
  variableValue: number;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const StyledTableCell = styled(TableCell)({
  padding: '8px 8px',
});

const SportVariablesRow: React.FC<SportVariablesRowProps> = memo(
  ({ variableKey, variableValue, onBlur }) => {
    const [localValue, setLocalValue] = useState(variableValue);

    useEffect(() => {
      setLocalValue(variableValue);
    }, [variableValue]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(parseFloat(event.target.value));
    };

    return (
      <TableRow>
        <StyledTableCell>{variableKey}</StyledTableCell>
        <StyledTableCell>
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
        </StyledTableCell>
      </TableRow>
    );
  },
  (prevProps, nextProps) =>
    prevProps.variableValue === nextProps.variableValue && prevProps.variableKey === nextProps.variableKey
);

export default SportVariablesRow;
