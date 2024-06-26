import Checkbox from "@mui/material/Checkbox";
import React from "react";

interface EvaluationChoiceProps {
  name: string;
  variant: "outlined" | "filled" | "standard";
  size: "small" | "medium";
  onChange: (value: boolean) => void;
  value?: string;
}

const EvaluationChoise: React.FC<EvaluationChoiceProps> = ({
  name,
  value,
  onChange,
}) => {
  const label = name.toUpperCase();

  return (
    <Checkbox
      checked={value === "true" ? true : false}
      onChange={(event) => onChange(event.target.checked)}
      inputProps={{ 'aria-label': label }}
    />
  );
};

export default EvaluationChoise;
