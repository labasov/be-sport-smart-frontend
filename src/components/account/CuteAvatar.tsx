import { Box } from "@mui/system";
import React from "react";
import Avatar, { genConfig } from "react-nice-avatar";

export const CuteAvatar = (props: { 
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  ref?: React.Ref<unknown> | undefined
}): React.JSX.Element => {
  const config = genConfig("hi@dapi.to");

  return (
    <Box sx={{ cursor: "pointer" }} onClick={props.onClick} ref={props.ref}>
      <Avatar style={{ width: "2.5rem", height: "2.5rem" }} {...config} />
    </Box>
  );
};
