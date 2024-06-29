import Checkbox from "@mui/material/Checkbox";
import React from "react";

import { useDynamicTranslation } from "../../../hooks/UseTranslation";

interface MeasureChoiceProps {
  name: string;
  size: "small" | "medium";
  onChange: (value: boolean) => void;
  variant?: "outlined" | "filled" | "standard";
  value?: string;
}

export const MeasureChoice: React.FC<MeasureChoiceProps> = ({
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