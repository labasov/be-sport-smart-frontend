
import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Unstable_Grid2";
import { ArrowRight as ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { Info as InfoIcon } from "@phosphor-icons/react/dist/ssr/Info";
import { Box, CardMedia, SxProps, Typography } from "@mui/material";
import { useInputStore } from "../../../stores/InputStore";
import { InputDto, InputType } from "../../../services/input-service/interfaces";
import EvaluationInput from "./EvaluationInput";

const states = [
  { value: "alabama", label: "Mesomorph" },
  { value: "new-york", label: "Endomorph " },
  { value: "san-francisco", label: "Ectomorph" },
] as const;

export interface EvaluationFormProps {
  sx?: SxProps;
  measure: (input: InputDto, value: string) => boolean;
}

export function EvaluationForm({ measure }: EvaluationFormProps): React.JSX.Element {
  const { loading, getCurrentInput, moveNext } = useInputStore();
  const input = getCurrentInput();
  const [value, setValue] = React.useState<string>("");

  React.useEffect(() => {
    console.log("input", input);
  }, [input]);

  const handleNext = () => {
    if (value && measure(input, value)) {
      console.log("ACCEPTED");
      setValue("");
      moveNext();
    }
  };

  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      { loading ? (
        <div>Loading...</div>
      ) : (
        <React.Fragment>
          <CardHeader title="Your value" />
          {/* <Divider /> */}
          <CardMedia
            component="img"
            // height="194"
            // width="151"
            image="/assets/body-type.png"
            alt="Sport"
            sx={{ objectFit: "scale-down" }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <Grid container spacing={3}>
                <Grid md={12} xs={12}>
                  <Typography gutterBottom variant="h5" component="div">
                    Body type
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over
                    6,000 species, ranging across all continents except Antarctica
                  </Typography>
                </Grid>
                <Grid md={8} xs={8}>
                  <FormControl fullWidth required>
                    { input.type === InputType.String || input.type === InputType.Number? (
                      <EvaluationInput
                        name={input.name}
                        options={input.options}
                        type={input.type}
                        variant="outlined"
                        size="small"
                        value={value}
                        onChange={(value) => setValue(value)}
                      />
                      ) : (
                      <></>
                    )}
                    { input.type === InputType.Boolean ? (<></>) : (<></>) }
                  </FormControl>
                </Grid>
                <Grid md={4} xs={4}>
                  <Button
                    color="info"
                    fullWidth
                    endIcon={<InfoIcon fontSize="var(--icon-fontSize-md)" />}
                    variant="contained"
                  >
                    Measure
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
          <Divider />
          <CardActions sx={{ pb: 1, pt: 1, pl: 3, pr: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button
                color="secondary"
                startIcon={<ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />}
                variant="contained"
              >
                Back
              </Button>
              <Button
                color="primary"
                endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
                variant="contained"
                onClick={() => handleNext()}
              >
                Next
              </Button>
            </Box>
          </CardActions>
        </React.Fragment>
      )}
    </Card>
  );
}
