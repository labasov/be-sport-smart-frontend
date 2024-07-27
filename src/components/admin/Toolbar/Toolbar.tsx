import { Box, Button } from '@mui/material';
import React from 'react';

import { SportDto } from '../../../services/core-admin/interfaces/SportDto';

import CreateSport from './CreateSport';

interface ExampleComponentProps {
  handleExpandAll: () => void;
  handleCollapseAll: () => void;
  onSportCreate: (sport: SportDto) => void;
  onSportTemplateReady: (sport: SportDto) => void;
}

const Toolbar: React.FC<ExampleComponentProps> = ({ 
  handleExpandAll,
  handleCollapseAll,
  onSportCreate,
  onSportTemplateReady
}) => {
  return (
    <Box display="flex" justifyContent="space-between" mb={2}>
      <Box display="flex">
        <Button variant="contained" color="primary" onClick={handleExpandAll}>
          Expand All
        </Button>
        <Button variant="contained" color="primary" onClick={handleCollapseAll} sx={{ ml: 2 }}>
          Collapse All
        </Button>
      </Box>
      {/* <Button variant="contained" color="primary" disabled={true} onClick={handleCreate}>
        Create
      </Button> */}
      <CreateSport 
        onSportCreate={onSportCreate}
        onSportTemplateReady={onSportTemplateReady}
      />
    </Box>
  );
};

export default Toolbar;
