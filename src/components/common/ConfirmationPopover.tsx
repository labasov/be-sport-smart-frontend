import { Button, Popover, Typography, Box } from "@mui/material";
import React, { useState } from "react";

import { useStaticTranslation } from "../../hooks/UseTranslation";

interface ConfirmationPopoverProps {
  children: React.ReactElement;
  onConfirm: () => void;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export const ConfirmationPopover: React.FC<ConfirmationPopoverProps> = ({
  children,
  onConfirm,
  message,
  confirmButtonText,
  cancelButtonText,
}) => {
  const { t } = useStaticTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirm = () => {
    onConfirm();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      {React.cloneElement(children, { onClick: handleClick })}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography>{message}</Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleClose} size="small" sx={{ mr: 1 }}>
              {cancelButtonText || t("common.actions.cancel")}
            </Button>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={handleConfirm}
            >
              {confirmButtonText || t("common.actions.confirm")}
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
};
