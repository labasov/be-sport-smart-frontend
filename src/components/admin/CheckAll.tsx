import Checkbox from "@mui/material/Checkbox";
import {
  useState,
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
} from "react";

import { ComputationType } from "../../services/core-admin/interfaces/ComputationType";

interface CheckAllProps {
  computationType: ComputationType;
  sportCount: number;
  selectAll: (selected: boolean) => void;
}

export interface CheckAllRef {
  onToggleSportsSelection: (count: number) => void;
}

export const CheckAll = forwardRef<CheckAllRef, CheckAllProps>(
  ({ computationType, sportCount, selectAll }, ref) => {
    const [checked, setChecked] = useState<boolean>(false);
    const [selectCount, setSelectCount] = useState<number>(0);

    useImperativeHandle(ref, () => ({
      onToggleSportsSelection: (count: number) => {
        setSelectCount(count);
        if (count === 0) {
          setChecked(false);
        }
      },
    }));

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
      selectAll(event.target.checked);
    };

    return (
      <Checkbox
        disabled={computationType !== ComputationType.Sport}
        checked={checked}
        indeterminate={selectCount > 0 && selectCount < sportCount}
        onChange={handleChange}
      />
    );
  }
);
