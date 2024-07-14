import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { SignOut as SignOutIcon } from '@phosphor-icons/react/dist/ssr/SignOut';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from '../../routes';
import { useUserStore } from '../../stores/UserStore';
// import { useUser } from '@/hooks/use-user';

export interface UserPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
  children?: React.ReactNode;
}

export function UserPopover({ anchorEl, onClose, open, children }: UserPopoverProps): React.JSX.Element {
  //const { checkSession } = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const { userEmail, signOut } = useUserStore();

  const router = useNavigate();

  const handleSignOut = React.useCallback(async (): Promise<void> => {
    try {
      onClose();
      await signOut()
    } catch (error) {
      enqueueSnackbar('An error occurred while signing out', { variant: 'error' });
    }
  }, [router]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '240px' } } }}
    >
      <Box sx={{ p: '16px 20px ', display: 'flex', alignItems: 'center', gap: 1 }}>
        {children}
        <Box>
          <Typography variant="subtitle1">Sofia Rivers</Typography>
          <Typography color="text.secondary" variant="body2">
            {userEmail}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
        <MenuItem href={routes.home} onClick={onClose}>
          <ListItemIcon>
            <GearSixIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem href={routes.evaluation} onClick={onClose}>
          <ListItemIcon>
            <UserIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <SignOutIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
}
