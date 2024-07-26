import { Box, Button } from '@mui/material';
import React from 'react';

interface ExampleComponentProps {
  handleExpandAll: () => void;
  handleCollapseAll: () => void;
  handleCreate: () => void;
}

const Toolbar: React.FC<ExampleComponentProps> = ({ handleExpandAll, handleCollapseAll, handleCreate }) => {
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
      <Button variant="contained" color="primary" disabled={true} onClick={handleCreate}>
        Create
      </Button>
    </Box>
  );
};

export default Toolbar;
