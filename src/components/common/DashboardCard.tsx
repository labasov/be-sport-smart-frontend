import { Card, CardHeader, Divider, CardActions, CardContent } from "@mui/material";
import { SxProps } from "@mui/system";

import { useStaticTranslation } from "../../hooks/UseTranslation";

import { LoadingOverlay } from "./LoadingOverlay";

export interface DashboardCardProps {
  titleKey: string;
  children: React.ReactNode;
  loading?: boolean;
  noPadding?: boolean;
  sx?: SxProps;
  media?: React.ReactNode;
  actions?: React.ReactNode;
}

export function DashboardCard({ titleKey, children, loading, noPadding, sx, media, actions }: DashboardCardProps): React.JSX.Element {
  const { t } = useStaticTranslation();

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', position: "relative", height: '100%' }}>
      <LoadingOverlay open={loading || false} />
      <CardHeader title={t(titleKey)} />
      <Divider />
      {media}
      <CardContent sx={{ flexGrow: 1, padding: noPadding? 0 : undefined,  ...sx }}>
        {children}
      </CardContent>
      {actions && (<>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          {actions}
        </CardActions>
      </> )}
    </Card>
  );
}
