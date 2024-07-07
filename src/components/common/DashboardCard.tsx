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
  topAction?: React.ReactNode;
  buttomActions?: React.ReactNode;
}

export function DashboardCard({ titleKey, children, loading, noPadding, sx, media, topAction, buttomActions }: DashboardCardProps): React.JSX.Element {
  const { t } = useStaticTranslation();

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', position: "relative", height: '100%' }}>
      <LoadingOverlay open={loading || false} />
      <CardHeader 
        title={t(titleKey)}
        action={topAction}
      />
      <Divider />
      {media}
      <CardContent sx={{ flexGrow: 1, padding: noPadding? 0 : undefined,  ...sx }}>
        {children}
      </CardContent>
      {buttomActions && (<>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          {buttomActions}
        </CardActions>
      </> )}
    </Card>
  );
}
