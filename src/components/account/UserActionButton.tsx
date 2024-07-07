import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { usePopover } from '../../hooks/UsePopover';
import { routes } from '../../routes';
import { useUserStore } from '../../stores/UserStore';
import { UserPopover } from '../common/UserPopover';

const UserActionButton = (): React.JSX.Element => {
  const navigate = useNavigate();
  const userPopover = usePopover<HTMLDivElement>();
  const { isSignedIn } = useUserStore();

  const handleLogin = () => {
    navigate(routes.signIn)
  };

  return (
    <>
      {isSignedIn ? (
        <Avatar
          onClick={userPopover.handleOpen}
          ref={userPopover.anchorRef}
          src="/assets/avatar.png"
          sx={{ cursor: 'pointer' }}
        />
      ) : (
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      )}
      <UserPopover anchorEl={userPopover.anchorRef.current} onClose={userPopover.handleClose} open={userPopover.open} />
    </>
  );
};

export default UserActionButton;
