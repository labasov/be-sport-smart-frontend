import { Box } from "@mui/system";
import React from "react";
import Avatar, { genConfig } from "react-nice-avatar";

import { Measure } from "../../services/core-service/interfaces";
import { useMeasureValuesStore } from "../../stores/MeasureValuesStore";
import { useUserStore } from "../../stores/UserStore";

export const CuteAvatar = (props: { size: number }) => {
  const { userEmail } = useUserStore();
  const { getMeasureValue } = useMeasureValuesStore();
  const gender = getMeasureValue({ name: "gender"} as unknown as Measure);
  const config = genConfig(userEmail);
  config.sex = gender === "Female" ? "woman" : "man";
  config.eyeBrowStyle = gender === "Female" ? "upWoman" : "up";
  config.hairStyle = gender === "Female" ? "womanShort" : "thick";
  config.hatStyle = "none";

  return (
    <Avatar
      style={{ width: `${props.size}rem`, height: `${props.size}rem` }}
      {...config}
    />
  );
};

export const CuteAvatarButton = React.forwardRef<
  HTMLDivElement,
  {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    size: number;
  }
>((props, ref) => {
  return (
    <Box sx={{ cursor: "pointer" }} onClick={props.onClick} ref={ref}>
      <CuteAvatar size={props.size} />
    </Box>
  );
});
