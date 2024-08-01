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
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { enqueueSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";

import config from "../../../config";
import { toSportKey } from "../../../helpers/stringHelpers";
import { SportDto } from "../../../services/core-admin/interfaces/SportDto";
import { SportManagerService } from "../../../services/core-admin/SportManagerService";
import { LoadingOverlay } from "../../common/LoadingOverlay";
import SportFormula from "../SportFormula";
import SportVariablesTable from "../SportVariables/SportVariablesTable";

interface CreateSportProps {
  onSportTemplateReady: (sport: SportDto) => void;
  onSportCreate: (sport: SportDto) => void;
}

const sportManagerService = new SportManagerService(config.backend.baseUrl);

const CreateSport: React.FC<CreateSportProps> = ({ onSportCreate, onSportTemplateReady }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showTemplate, setShowTemplate] = useState(false);
  const [createDisabled, setCreateDisabled] = useState(false);
  const [sport, setSport] = useState<SportDto | null>(null);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setShowTemplate(false);
  };

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
    (_: string, variableKey: string, variableValue: number | string | boolean) => {
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
      const sportToCreate = { ...sport!, name: toSportKey(sport!.name), disabled: createDisabled };
      const createdSport = await sportManagerService.createSport(
        { ...sportToCreate },
        createDisabled
      );

      enqueueSnackbar(`Sport '${sportToCreate.name}' created successfully!`, { variant: "success" });
      onSportCreate(createdSport);
      handleCloseDialog();
    } catch (error) {
      enqueueSnackbar("Failed to create sport", { variant: "error" });
    }
    setIsLoading(false);
  };

  return (
    <Box>
      <Button 
        variant="contained"
        color="primary"
        onClick={handleOpenDialog}
        startIcon={<PlusIcon/>}>
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
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <FormControlLabel
              control={
                <Checkbox
                  checked={createDisabled}
                  onChange={handleCreateDisabledChange}
                />
              }
              label="Create disabled"
            />
            <Button
              variant="outlined"
              color="primary"
              size={"small"}
              onClick={() => setShowTemplate(!showTemplate)}
              sx={{ ml: 2 }}
            >
              { !showTemplate? "Show template" : "Hide template" }
            </Button>
          </Box>
          <Box mt={2}>
            {sport && (
              !showTemplate && (<SportVariablesTable
                sport={sport}
                handleVariableChange={handleVariableChange}
                updatedSports={{ current: {} }}
              />)
              || (<SportFormula sport={sport}/>)
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ pl: "24px", pr: "24px", pb: "20px", pt: "0px" }}>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Button variant="outlined" color="secondary" size={"small"} onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" size={"small"} onClick={handleSave}>
              Save
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateSport;
