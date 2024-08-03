import { Box, Button, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, useTheme } from '@mui/material';
import React, { useState } from 'react';

import { ComputationType } from '../../../services/core-admin/interfaces/ComputationType';
import { SportDto } from '../../../services/core-admin/interfaces/SportDto';

import CreateSport from './CreateSport';

interface ExampleComponentProps {
  handleExpandAll: () => void;
  handleCollapseAll: () => void;
  onSportCreate: (sport: SportDto) => void;
  onSportTemplateReady: (sport: SportDto) => void;
  onComputationTypeSelect: (type: ComputationType) => void;
}

const Toolbar: React.FC<ExampleComponentProps> = ({ 
  handleExpandAll,
  handleCollapseAll,
  onSportCreate,
  onSportTemplateReady,
  onComputationTypeSelect
}) => {
  const [selection, setSelection] = useState<ComputationType>(ComputationType.Sport);
  const theme = useTheme();

  const handleSelectionChange = (event: SelectChangeEvent<string>) => {
    const selectedType = event.target.value as ComputationType;
    setSelection(selectedType);
    onComputationTypeSelect(selectedType);
  };

  return (
    <Box 
      display="flex" 
      justifyContent="space-between" 
      alignItems="center" 
      mb={2}
      sx={{ backgroundColor: theme.palette.background.paper, padding: 2, borderRadius: 1 }}
    >
      <Box display="flex" alignItems="center">
        <FormControl variant="outlined" sx={{ mr: 2, minWidth: 120 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={selection}
            onChange={handleSelectionChange}
            label="Type"
            size="small"
          >
            <MenuItem value={ComputationType.Sport}>Sport</MenuItem>
            <MenuItem value={ComputationType.Metric}>Metric</MenuItem>
            <MenuItem value={ComputationType.Score}>Score</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleExpandAll}>
          Expand All
        </Button>
        <Button variant="contained" color="primary" onClick={handleCollapseAll} sx={{ ml: 2 }}>
          Collapse All
        </Button>
      </Box>
      <CreateSport
        disabled={selection !== ComputationType.Sport}
        onSportCreate={onSportCreate}
        onSportTemplateReady={onSportTemplateReady}
      />
    </Box>
  );
};

export default Toolbar;
