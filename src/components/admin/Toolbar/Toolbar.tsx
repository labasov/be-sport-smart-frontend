import {
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { forwardRef, useImperativeHandle, useState } from "react";

import { ComputationType } from "../../../services/core-admin/interfaces/ComputationType";
import { SportDto } from "../../../services/core-admin/interfaces/SportDto";

import BulkSportUpdate from "./BulkSportUpdate";
import CreateSport from "./CreateSport";

export interface ToolbarRef {
  onSportSelectionChange: (count: number) => void;
}

interface ToolbarProps {
  handleExpandAll: () => void;
  handleCollapseAll: () => void;
  onSportCreate: (sport: SportDto) => void;
  onSportsUpdate: (sports: SportDto[]) => void;
  onSportTemplateReady: (sport: SportDto) => void;
  onComputationTypeSelect: (type: ComputationType) => void;
  isSportOutOfSync: (sport: SportDto) => boolean;
  selectedSports: React.RefObject<SportDto[]>;
}

const Toolbar = forwardRef<ToolbarRef, ToolbarProps>(
  (
    {
      handleExpandAll,
      handleCollapseAll,
      onSportCreate,
      onSportsUpdate,
      onSportTemplateReady,
      onComputationTypeSelect,
      isSportOutOfSync,
      selectedSports,
    },
    ref
  ) => {
    const [sportTemplate, setSportTemplate] = useState<SportDto | null>(null);
    const [computationType, setComputationType] = useState<ComputationType>(
      ComputationType.Sport
    );
    const [selectCount, setSelectCount] = useState<number>(0);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    useImperativeHandle(ref, () => ({
      onSportSelectionChange: (count: number) => {
        setSelectCount(count);
      },
    }));

    const handleSelectionChange = (event: SelectChangeEvent<string>) => {
      const selectedType = event.target.value as ComputationType;
      setComputationType(selectedType);
      onComputationTypeSelect(selectedType);
    };

    const handleSportTemplateReady = (sport: SportDto) => {
      onSportTemplateReady(sport);
      setSportTemplate(sport);
    };

    return (
      <Box
        display="flex"
        flexDirection={isSmallScreen ? "column" : "row"}
        justifyContent={isSmallScreen ? "center" : "space-between"}
        alignItems="center"
        mb={2}
        sx={{
          backgroundColor: theme.palette.background.paper,
          padding: 2,
          borderRadius: 1,
        }}
      >
        <Box
          display="flex"
          flexDirection={isSmallScreen ? "column" : "row"}
          alignItems="center"
          justifyContent="flex-start"
          sx={{ flex: 1 }}
        >
          <Box sx={{ mb: isSmallScreen ? 2 : 0 }}>
            <FormControl
              variant="outlined"
              sx={{
                mr: 2,
                minWidth: 120,
              }}
            >
              <InputLabel>Type</InputLabel>
              <Select
                value={computationType}
                onChange={handleSelectionChange}
                label="Type"
                size="small"
              >
                <MenuItem value={ComputationType.Sport}>Sport</MenuItem>
                <MenuItem value={ComputationType.Metric}>Metric</MenuItem>
                <MenuItem value={ComputationType.Score}>Score</MenuItem>
              </Select>
            </FormControl>
            <BulkSportUpdate
              sportCount={selectCount}
              disabled={selectCount === 0 || computationType !== ComputationType.Sport}
              selectedSports={selectedSports}
              template={sportTemplate!}
              onSportsUpdate={onSportsUpdate}
              isSportOutOfSync={isSportOutOfSync}
            />
          </Box>
          <Box sx={{ ml: 2, mb: isSmallScreen ? 2 : 0 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleExpandAll}
              sx={{ mr: 2 }}
            >
              Expand All
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCollapseAll}
            >
              Collapse All
            </Button>
          </Box>
        </Box>
        <Box
          // display="flex"
          // flexDirection={"row"}
          // alignItems="center"
          // justifyContent="flex-start"
          // sx={{ flex: 1, maxWidth: "250px" }}
        >
          <CreateSport
            disabled={computationType !== ComputationType.Sport}
            onSportCreate={onSportCreate}
            onSportTemplateReady={handleSportTemplateReady}
          />
        </Box>
      </Box>
    );
  }
);

export default Toolbar;
