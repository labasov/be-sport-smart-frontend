import Checkbox from "@mui/material/Checkbox";
import React from "react";
import { useDynamicTranslation } from "../../../hooks/UseTranslation";

interface MeasureChoiceProps {
  name: string;
  variant: "outlined" | "filled" | "standard";
  size: "small" | "medium";
  onChange: (value: boolean) => void;
  value?: string;
}

export const MeasureChoise: React.FC<MeasureChoiceProps> = ({
  name,
  value,
  onChange,
}) => {
  const { t } = useDynamicTranslation();
  const label = t(`measures.${name}.name`);

  return (
    <Checkbox
      checked={value === "true" ? true : false}
      onChange={(event) => onChange(event.target.checked)}
      inputProps={{ 'aria-label': label }}
    />
  );
};