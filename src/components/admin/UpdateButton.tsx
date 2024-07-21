import { Button } from "@mui/material";
import React, { useState, useImperativeHandle, forwardRef } from "react";

import { LoadingOverlay } from "../common/LoadingOverlay";

interface UpdateButtonProps {
  apply: () => Promise<void>;
}

export interface UpdateButtonRef {
  updateCount: (count: number) => void;
}

const UpdateButton: React.ForwardRefRenderFunction<UpdateButtonRef, UpdateButtonProps> = (
  { apply },
  ref
) => {
  const [ updateCount, setUpdateCount ] = useState(0);
  const [ isUpdating, setIsUpdating ] = useState(false);

  useImperativeHandle(ref, () => ({
    updateCount: (count: number) => {
      setUpdateCount(count);
    },
  }));

  const onClick = async () => {
    setIsUpdating(true);
    await apply();
    setIsUpdating(false);
  }

  return (
    <>
      <LoadingOverlay open={isUpdating} />
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        disabled={updateCount === 0 || isUpdating}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
      >
        {`Update (${updateCount})`}
      </Button>
    </>
  );
};

export default forwardRef(UpdateButton);
