import {
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";

import config from "../../../config";
import { toSportKey } from "../../../helpers/stringHelpers";
import { SportDto } from "../../../services/core-admin/interfaces/SportDto";
import { SportManagerService } from "../../../services/core-admin/SportManagerService";
import { LoadingOverlay } from "../../common/LoadingOverlay";
import SportVariablesTable from "../SportVariables/SportVariablesTable";

interface CreateSportProps {
  onSportTemplateReady: (sport: SportDto) => void;
  onSportCreate: (sport: SportDto) => void;
}

const sportManagerService = new SportManagerService(config.backend.baseUrl);

const CreateSport: React.FC<CreateSportProps> = ({ onSportCreate, onSportTemplateReady }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [createDisabled, setCreateDisabled] = useState(false);
  const [sport, setSport] = useState<SportDto | null>(null);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  useEffect(() => {
    const fetchSportTemplate = async () => {
      const sportTemplate = await sportManagerService.getSportTemplate();
      setSport(sportTemplate);
      onSportTemplateReady(sportTemplate);
      setIsLoading(false);
    };

    fetchSportTemplate();
  }, []);

  const handleSportNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedSport = {
      ...sport!,
      name: toSportKey(event.target.value, false),
    };
    setSport(updatedSport);
  };

  const handleCreateDisabledChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCreateDisabled(event.target.checked);
  };

  const handleVariableChange = useCallback(
    (_: string, variableKey: string, variableValue: number) => {
      if (!sport) return;

      const updatedVariables = {
        ...sport.variables,
        [variableKey]: variableValue,
      };
      const updatedSport = { ...sport, variables: updatedVariables };

      setSport(updatedSport);
    },
    []
  );

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const sportToCreate = { ...sport!, name: toSportKey(sport!.name) };
      await sportManagerService.createSport(
        { ...sportToCreate },
        createDisabled
      );

      enqueueSnackbar(`Sport '${sportToCreate.name}' created successfully!`, { variant: "success" });
      onSportCreate(sportToCreate);
      handleCloseDialog();
    } catch (error) {
      enqueueSnackbar("Failed to create sport", { variant: "error" });
    }
    setIsLoading(false);
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Create
      </Button>
      <Dialog
        open={dialogOpen}
        maxWidth="xl"
        onClose={handleCloseDialog}
        sx={{ position: "relative" }}
      >
        <LoadingOverlay open={isLoading} />
        <DialogTitle>Create Sport</DialogTitle>
        <DialogContent
        >
          <TextField
            label="Sport Key"
            value={sport?.name}
            placeholder="new_sport"
            onChange={handleSportNameChange}
            fullWidth
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={createDisabled}
                onChange={handleCreateDisabledChange}
              />
            }
            label="Create disabled"
          />
          <Box mt={2}>
            {sport && (
              <SportVariablesTable
                sport={sport}
                handleVariableChange={handleVariableChange}
                updatedSports={{ current: {} }}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ pl: "24px", pr: "24px", pb: "20px", pt: "0px" }}>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Button variant="outlined" color="secondary" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateSport;
