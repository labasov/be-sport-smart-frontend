import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ArrowsClockwise as ArrowsClockwiseIcon } from "@phosphor-icons/react/dist/ssr/ArrowsClockwise";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";

import config from "../../../../config";
import { ComputationType } from "../../../../services/core-admin/interfaces/ComputationType";
import { SportDto } from "../../../../services/core-admin/interfaces/SportDto";
import { SportManagerService } from "../../../../services/core-admin/SportManagerService";
import { ConfirmationPopover } from "../../../common/ConfirmationPopover";
import { LoadingOverlay } from "../../../common/LoadingOverlay";
import SportVariablesTable from "../sport-variables/SportVariablesTable";

interface BulkSportUpdateProps {
  disabled: boolean;
  template: SportDto | null;
  sportCount: number;
  selectedSports: React.RefObject<SportDto[]>;
  onSportsUpdate: (sports: SportDto[]) => void;
  isSportOutOfSync: (sport: SportDto) => boolean;
}

const sportManagerService = new SportManagerService(config.backend.baseUrl);

const BulkSportUpdate: React.FC<BulkSportUpdateProps> = ({
  disabled,
  sportCount,
  template,
  selectedSports,
  onSportsUpdate,
  isSportOutOfSync,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVariables, setSelectedVariables] = useState<string[]>([]);
  const [sport, setSport] = useState<SportDto>({
    name: "bulk_sport",
    variables: {},
    formula: "",
    type: ComputationType.Sport,
    disabled: false,
  });

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const selectedValues = event.target.value as string[];
    setSelectedVariables(selectedValues);

    const newVariables: { [key: string]: string | boolean | number } = {};

    selectedValues.forEach((variable) => {
      // eslint-disable-next-line no-prototype-builtins
      if (sport.variables.hasOwnProperty(variable)) {
        newVariables[variable] = sport.variables[variable];
      }
    });

    if (template) {
      Object.keys(template.variables).forEach((variable) => {
        if (
           
          selectedValues.includes(variable) &&
          // eslint-disable-next-line no-prototype-builtins
          !sport.variables.hasOwnProperty(variable)
        ) {
          newVariables[variable] = template.variables[variable];
        }
      });
    }

    setSport({
      ...sport,
      variables: newVariables,
    });
  };
  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const getSportsToSyncCount = (): number => {
    const uoutOfSyncSports = selectedSports.current
      ?.map(isSportOutOfSync)
      .filter((x) => x == true).length;
    return uoutOfSyncSports!;
  };

  const handleVariableChange = (
    _: string,
    variableKey: string,
    variableValue: number | string | boolean
  ) => {
    setSport((prevSport) => {
      const updatedVariables = {
        ...prevSport.variables,
        [variableKey]: variableValue,
      };
      return { ...prevSport, variables: updatedVariables };
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const updatedSportsArray = selectedSports.current!.map((selectedSport) => ({
        name: selectedSport.name,
        variables: sport.variables,
      }));
      
      const updatedSports = await sportManagerService.updateSports(updatedSportsArray);

      enqueueSnackbar(`'${selectedSports.current?.length}' sport(s) updated successfully!`, { variant: "success" });
      onSportsUpdate(updatedSports);
      handleCloseDialog();
    } catch (error) {
      enqueueSnackbar("Failed to update some sports", { variant: "error" });
    }

    setIsLoading(false);
  };

  const handleSyncSports = async () => {
    setIsLoading(true);
    try {
      const outOfSyncSports = selectedSports.current?.filter(isSportOutOfSync);
      const updatedSports = await sportManagerService.syncSports(
        outOfSyncSports!.map((sport) => sport.name)
      );

      enqueueSnackbar(`'${outOfSyncSports?.length}' sport(s) synced successfully!`, { variant: "success" });
      onSportsUpdate(updatedSports);
      handleCloseDialog();
    } catch (error) {
      enqueueSnackbar("Failed to sync some sports", { variant: "error" });
    }

    setIsLoading(false);
  };

  const outOfSyncSportCount = getSportsToSyncCount();

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        disabled={disabled}
        onClick={handleOpenDialog}
      >
        Bulk Update ({sportCount})
      </Button>
      <Dialog open={dialogOpen} scroll="paper" onClose={handleCloseDialog}>
        <LoadingOverlay open={isLoading} />
        <DialogTitle>Bulk Sport Update</DialogTitle>
        <Divider />
        <DialogContent>
          <Box mt={2}>
            {template && template.variables && (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "left",
                }}
                mb={2}
              >
                <FormControl size="small" fullWidth>
                  <InputLabel>Select Variables</InputLabel>
                  <Select
                    multiple
                    label="Select Variables"
                    value={selectedVariables}
                    onChange={handleSelectChange}
                    renderValue={(selected) => (
                      <Box
                        style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
                      >
                        {(selected as string[]).map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {Object.keys(template.variables).map((key) => (
                      <MenuItem key={key} value={key}>
                        {key}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}
            {sport && (
              <SportVariablesTable
                sport={sport}
                handleVariableChange={handleVariableChange}
                updatedSports={{ current: {} }}
              />
            )}
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ pl: "24px", pr: "24px", pb: "20px", pt: "20px" }}>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Button
              variant="outlined"
              color="secondary"
              size={"small"}
              onClick={handleCloseDialog}
            >
              Cancel
            </Button>
            <ConfirmationPopover
              onConfirm={handleSyncSports}
              message={`Are you sure you want to sync ${outOfSyncSportCount} sport(s)?`}
            >
              <Button
                variant="outlined"
                color="secondary"
                size={"small"}
                disabled={outOfSyncSportCount === 0}
                startIcon={<ArrowsClockwiseIcon />}
                sx={{ ml: 2, mr: 2 }}
              >
                Sync ({outOfSyncSportCount}) outdated sport(s)
              </Button>
            </ConfirmationPopover>
            <Button
              variant="contained"
              color="primary"
              size={"small"}
              disabled={sport.variables && Object.keys(sport.variables).length === 0}
              onClick={handleSave}
            >
              Update ({selectedSports.current?.length})
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BulkSportUpdate;
