import { Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery } from '@mui/material';
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
  const isMobile = useMediaQuery("(max-width:600px)");
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
          startIcon={<QuestionIcon fontSize="var(--icon-fontSize-md)" />}
          variant="text"
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
            sx={{paddingBottom: 0, minWidth: isMobile ? '310px' : '650px'}}
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