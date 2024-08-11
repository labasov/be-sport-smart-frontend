import {
  TableRow,
  TableCell,
  TextField,
  Checkbox,
  styled,
  Typography,
  Box,
} from "@mui/material";
import React, { useEffect, useState, memo } from "react";

interface SportVariablesRowProps {
  variableKey: string;
  variableValue: number | string | boolean;
  onChange: (variableValue: number | string | boolean) => void;
}

const StyledTableCell = styled(TableCell)({
  padding: "8px 8px",
});

const SportVariablesRow: React.FC<SportVariablesRowProps> = memo(
  ({ variableKey, variableValue, onChange }) => {
    const [localValue, setLocalValue] = useState(variableValue);

    useEffect(() => {
      setLocalValue(variableValue);
    }, [variableValue]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      let value: number | string | boolean;
      if (typeof variableValue === "number") {
        value = parseFloat(event.target.value);
      } else if (typeof variableValue === "boolean") {
        value = event.target.checked;
      } else {
        value = event.target.value;
      }
      onChange(value);
      setLocalValue(value);
    };

    return (
      <TableRow>
        <StyledTableCell>{variableKey}</StyledTableCell>
        <StyledTableCell>
          {typeof variableValue === "number" ? (
            <TextField
              type="number"
              value={localValue as number}
              onChange={handleChange}
              variant="outlined"
              size="small"
              InputProps={{
                style: {
                  height: "30px",
                  backgroundColor:
                    variableValue === localValue
                      ? "var(--mui-palette-common-background)"
                      : "var(--mui-palette-success-200)",
                },
                inputProps: { step: "any" },
              }}
            />
          ) : typeof variableValue === "boolean" ? (
            <Box display="flex" alignItems="center">
              <Checkbox
                checked={localValue as boolean}
                onChange={handleChange}
                color="primary"
                size="small"
                sx={{ padding: "4px" }}
              />
              {variableValue !== localValue && (
                <Typography variant="body2" color="success.main">
                  (Changed)
                </Typography>
              )}
            </Box>
          ) : (
            <TextField
              type="text"
              value={localValue as string}
              onChange={handleChange}
              variant="outlined"
              size="small"
              InputProps={{
                style: {
                  height: "30px",
                  backgroundColor:
                    variableValue === localValue
                      ? "var(--mui-palette-common-background)"
                      : "var(--mui-palette-success-200)",
                },
                inputProps: { step: "any" },
              }}
            />
          )}
        </StyledTableCell>
      </TableRow>
    );
  },
  (prevProps, nextProps) =>
    prevProps.variableValue === nextProps.variableValue &&
    prevProps.variableKey === nextProps.variableKey
);

export default SportVariablesRow;
