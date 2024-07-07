import { Skeleton } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { exists } from 'i18next';
import React from 'react';

import { useDynamicTranslation } from '../../hooks/UseTranslation';
import { useMeasureStepperStore } from '../../stores/MeasureStepperStore';
import { DynamicNamespace } from '../../constants/LocalizationConstants';

export const MeasureImage: React.FC = () => {
  const { getCurrentMeasure } = useMeasureStepperStore();
  const currentMeasure = getCurrentMeasure();

  const { t } = useDynamicTranslation();
  const imageKey = currentMeasure !== undefined ? `measures.${currentMeasure.name}.image` : '';
  const image = exists(imageKey, {ns: DynamicNamespace}) ? t(imageKey) : undefined;

  if (currentMeasure === undefined || image === undefined) {
    return <Skeleton variant="rectangular" width="100%" height={250} />
  }

  return (
    <CardMedia
      component="img"
      image={image}
      alt={`measures.${currentMeasure.name}.name`}
      sx={{ objectFit: "crop", height: 250}}
    />
  );
};

export default MeasureImage;