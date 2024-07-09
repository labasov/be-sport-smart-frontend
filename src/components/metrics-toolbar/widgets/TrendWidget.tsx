import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import type { SxProps } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { ArrowDown as ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@phosphor-icons/react/dist/ssr/ArrowUp";
import { Icon } from "@phosphor-icons/react/dist/lib/types";

export interface TrendWidgetProps {
  name: string;
  loading: boolean;
  value: string | undefined;
  icon: Icon;
  iconColor: "success" | "warning" | "primary" | "info" | "secondary" | "error";
  description: string;
  diff?: string;
  trend?: "up" | "down";
  sx?: SxProps;
}

export function TrendWidget({
  diff,
  loading,
  sx,
  name,
  value,
  description,
  trend,
  icon,
  iconColor,
}: TrendWidgetProps): React.JSX.Element {
  const MainIcon = icon;
  const TrendIcon = trend === "up" ? ArrowUpIcon : ArrowDownIcon;
  const trendColor =
    trend === "up"
      ? "var(--mui-palette-success-main)"
      : "var(--mui-palette-error-main)";

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={3}>
          <Stack
            direction="row"
            sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                {name}
              </Typography>
              <Typography variant="h4">{value}</Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: `var(--mui-palette-${iconColor}-main)`,
                height: "56px",
                width: "56px",
              }}
            >
              <MainIcon fontSize="var(--icon-fontSize-lg)" />
            </Avatar>
          </Stack>
          <Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
            {diff ? (
              <Stack
                sx={{ alignItems: "center" }}
                direction="row"
                spacing={0.5}
              >
                <TrendIcon
                  color={trendColor}
                  fontSize="var(--icon-fontSize-md)"
                />
                <Typography color={trendColor} variant="body2">
                  {diff}
                </Typography>
              </Stack>
            ) : null}
            <Typography color="text.secondary" variant="caption">
              {description}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
