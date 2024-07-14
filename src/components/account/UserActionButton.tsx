import Button from '@mui/material/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { usePopover } from '../../hooks/UsePopover';
import { useStaticTranslation } from '../../hooks/UseTranslation';
import { routes } from '../../routes';
import { useUserStore } from '../../stores/UserStore';
import { UserPopover } from '../common/UserPopover';

import { CuteAvatar, CuteAvatarButton } from './CuteAvatar';

const UserActionButton = (): React.JSX.Element => {
  const { t } = useStaticTranslation();
  const navigate = useNavigate();
  const userPopover = usePopover<HTMLDivElement>();
  const { isSignedIn } = useUserStore();

  const handleLogin = () => {
    navigate(routes.signIn)
  };

  return (
    <>
      {isSignedIn ? (
        <CuteAvatarButton size={2.5} onClick={userPopover.handleOpen} ref={userPopover.anchorRef}/>
      ) : (
        <Button variant="contained" size="small" color="primary" onClick={handleLogin}>
          {t('auth.actions.signIn')}
        </Button>
      )}
      <UserPopover anchorEl={userPopover.anchorRef.current} onClose={userPopover.handleClose} open={userPopover.open} >
        <CuteAvatar size={5}/>
      </UserPopover>
    </>
  );
};

export default UserActionButton;
