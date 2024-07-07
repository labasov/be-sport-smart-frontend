import { Box, Typography, Button } from "@mui/material";
import { Check as CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
import React from "react";

import { useStaticTranslation } from "../../hooks/UseTranslation";

const FinalScreen: React.FC = () => {
  const { t } = useStaticTranslation();
  const handleWhereToEvaluateClick = () => {
    console.log("Where to evaluate clicked");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          margin: "0 auto",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <CheckIcon size={100} color="green" />
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          {t("measure.finalScreen.wellDone")}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {t("measure.finalScreen.complitionTitle")}
          <br />
          <br />
          <span style={{ fontStyle: "italic", fontSize: "0.875rem" }}>
            {t("measure.finalScreen.complitionDescription")}
          </span>
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleWhereToEvaluateClick}
        >
          {t("measure.finalScreen.whereToExamine")}
        </Button>
      </Box>
    </Box>
  );
};

export default FinalScreen;
