import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import type { SxProps } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Icon } from "@phosphor-icons/react/dist/lib/types";
import { ArrowDown as ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@phosphor-icons/react/dist/ssr/ArrowUp";
import { TrendUp as TrendUpIcon } from "@phosphor-icons/react/dist/ssr/TrendUp";
import * as React from "react";

export interface TrendWidgetProps {
  name: string;
  loading: boolean;
  value: string | undefined;
  measure: string;
  icon: Icon;
  iconColor: "success" | "warning" | "primary" | "info" | "secondary" | "error";
  description: string;
  diff?: string;
  trend?: "up" | "down" | "trendUp";
  sx?: SxProps;
}

export function TrendWidget({
  diff,
  loading,
  sx,
  name,
  value,
  measure,
  description,
  trend,
  icon,
  iconColor,
}: TrendWidgetProps): React.JSX.Element {
  const MainIcon = icon;
  const trendColor =
    trend === "down"
      ? "var(--mui-palette-error-main)"
      : "var(--mui-palette-success-main)";

  let TrendIcon;
  switch (trend) {
    case "up":
      TrendIcon = ArrowUpIcon;
      break;
    case "down":
      TrendIcon = ArrowDownIcon;
      break;
    case "trendUp":
      default:
      TrendIcon = TrendUpIcon;
      break;
  }

  return (
    <Card sx={{...sx, height: "100%"}} >
      <CardContent>
        <Stack spacing={3}>
          <Stack
            direction="row"
            sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
            spacing={3}
          >
            <Stack spacing={1}>
              {loading ? (
                <Box>
                  <Skeleton variant="text" width={80} height={30}/>
                  <Skeleton variant="text" width={100} height={40}/>
                </Box>
              ) : (
                <>
                  <Typography color="text.secondary" variant="overline">
                    {name}
                  </Typography>
                  <Stack direction={"row"} alignItems="flex-end">
                    <Typography
                      variant="h4"
                      style={{ color: value ? 'inherit' : 'gray' }}
                    >
                      {value || "Unknown"}
                    </Typography>
                    <Typography color="text.secondary" variant="caption" style={{ marginLeft: '4px'}}>
                      {measure}
                    </Typography>
                  </Stack>
                </>
              )}
            </Stack>
            {loading ? (
              <Skeleton variant="circular" width={56} height={56} />
            ) : (
              <Avatar
                sx={{
                  backgroundColor: `var(--mui-palette-${iconColor}-main)`,
                  height: "56px",
                  width: "56px",
                }}
              >
                <MainIcon fontSize="var(--icon-fontSize-lg)" />
              </Avatar>
            )}
          </Stack>
          <Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
            {loading ? (
              <Skeleton variant="text" width={200} />
            ) : (
              <>
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
              </>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
