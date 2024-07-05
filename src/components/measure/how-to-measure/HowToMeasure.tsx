import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Question as QuestionIcon } from "@phosphor-icons/react/dist/ssr/Question";
import React, { useState } from 'react';

import { useDynamicTranslation, useStaticTranslation } from '../../../hooks/UseTranslation';
import { YoutubeEmbed } from '../../common/youtube-embed/YoutubeEmbed';

interface ButtonWithDialogProps {
  measureName: string;
}

const ButtonWithDialog: React.FC<ButtonWithDialogProps> = ({ measureName }) => {
  const { t: tDynamic } = useDynamicTranslation();
  const { t: tStatic } = useStaticTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const youtubeEmbdedId = tDynamic(`measures.${measureName}.youtubeEmbdedId`);

  return (
    <>
       <Button
          color="info"
          fullWidth
          onClick={handleOpenDialog} 
          endIcon={<QuestionIcon fontSize="var(--icon-fontSize-md)" />}
          variant="contained"
        >
          {tStatic("measure.form.help")}
        </Button>
        <Dialog
          open={isOpen}
          maxWidth="md"
          onClose={handleCloseDialog}
        >
          <DialogTitle>
            {tStatic("measure.form.howToMeasure", { measureName: measureName })}
          </DialogTitle>
          <DialogContent
            sx={{paddingBottom: 0}}
          >
            {!!youtubeEmbdedId && (
              <YoutubeEmbed 
                embedId={youtubeEmbdedId} 
                titleKey={tDynamic(`measures.${measureName}.name`)} 
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>
              {tStatic("common.actions.close")}
            </Button>
          </DialogActions>
      </Dialog>
    </>
  );
};

export default ButtonWithDialog;