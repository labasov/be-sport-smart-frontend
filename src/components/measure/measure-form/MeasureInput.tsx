import { InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React from "react";

import { useDynamicTranslation } from "../../../hooks/UseTranslation";
import { MeasureType } from "../../../services/core-service/interfaces";

interface MeasureInputProps {
  name: string;
  options: string[];
  type: MeasureType.Number | MeasureType.String;
  size: "small" | "medium";
  onChange: (value: string) => void;
  variant?: "outlined" | "filled" | "standard";
  value?: string;
}

export const MeasureInput: React.FC<MeasureInputProps> = ({
  name,
  options,
  type,
  variant,
  size,
  value,
  onChange,
}) => {
  const { t } = useDynamicTranslation();
  const label = t(`measures.${name}.name`);

  if (options.length > 0) {
    return (
      <>
        <InputLabel>{label}</InputLabel>
        <Select
          label={label}
          name={name}
          variant={variant}
          size={size}
          defaultValue={value || options[0]}
          onChange={(event) => onChange(event.target.value)}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </>
    );
  }

  return (
    <TextField
      type={type === MeasureType.String ? "text" : "number"}
      label={label}
      name={name}
      variant={variant}
      size={size}
      autoFocus
      required
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};