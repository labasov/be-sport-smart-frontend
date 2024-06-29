import CardMedia from '@mui/material/CardMedia';
import React from 'react';

import { useDynamicTranslation } from '../../hooks/UseTranslation';
import { useMeasureStepperStore } from '../../stores/MeasureStepperStore';

export const MeasureImage: React.FC = () => {
  const { getCurrentMeasure } = useMeasureStepperStore();
  const currentMeasure = getCurrentMeasure();

  const { t } = useDynamicTranslation();
  const image = currentMeasure !== undefined ? t(`measures.${currentMeasure.name}.image`) : '';

  return (
    <CardMedia
      component="img"
      image={image}
      alt="Sport"
      sx={{ objectFit: "scale-down", height: 200}}
    />
  );
};

export default MeasureImage;