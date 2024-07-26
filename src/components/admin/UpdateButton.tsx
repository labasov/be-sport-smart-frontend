import { Button } from "@mui/material";
import React, { useState, useImperativeHandle, forwardRef } from "react";

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

  useImperativeHandle(ref, () => ({
    updateCount: (count: number) => {
      setUpdateCount(count);
    },
  }));

  const onClick = async () => {
    await apply();
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        disabled={updateCount === 0}
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
