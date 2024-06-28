import { Card, CardHeader, Divider, CardActions, CardContent, CircularProgress } from "@mui/material";
import { SxProps } from "@mui/system";
import { useStaticTranslation } from "../../hooks/UseTranslation";

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

  if (loading)
    return <CircularProgress />;

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardHeader title={t(titleKey)} />
      <Divider />
      {media}
      <CardContent sx={{ flexGrow: 1, padding: noPadding? 0 : undefined, ...sx }}>
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
