import { Skeleton } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { exists } from 'i18next';
import React from 'react';

import { useDynamicTranslation } from '../../hooks/UseTranslation';
import { useMeasureStepperStore } from '../../stores/MeasureStepperStore';

export const MeasureImage: React.FC = () => {
  const { getCurrentMeasure } = useMeasureStepperStore();
  const currentMeasure = getCurrentMeasure();

  const { t, } = useDynamicTranslation();
  const imageKey = currentMeasure !== undefined ? `measures.${currentMeasure.name}.image` : '';

  const image = exists(imageKey) ? t(imageKey) : undefined;

  if (currentMeasure === undefined || image === undefined) {
    return <Skeleton variant="rectangular" width="100%" height={200} />
  }

  return (
    <CardMedia
      component="img"
      image={image}
      alt="Sport"
      sx={{ objectFit: "scale-down", minHeight: 200}}
    />
  );
};

export default MeasureImage;