import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { SignOut as SignOutIcon } from '@phosphor-icons/react/dist/ssr/SignOut';
import { Table as TableIcon } from '@phosphor-icons/react/dist/ssr/Table';
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
  const { userEmail, userRoles, signOut } = useUserStore();

  const router = useNavigate();
  const isInRole = (role: string): boolean => userRoles?.includes(role) ?? false;

  const handleSignOut = React.useCallback(async (): Promise<void> => {
    try {
      onClose();
      await signOut()
    } catch (error) {
      enqueueSnackbar('An error occurred while signing out', { variant: 'error' });
    }
  }, [router]);

  const handleNavigate = (path: string): void => {
    onClose();
    router(path);
  }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '240px' } } }}
    >
     <Box sx={{ p: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
  <Stack direction="column" spacing={1} alignItems="center">
    {children}
    <Box textAlign="center">
      <Typography variant="subtitle1">Fit User</Typography>
      <Typography color="text.secondary" variant="body2">
        {userEmail}
      </Typography>
    </Box>
  </Stack>
</Box>
      <Divider />
      <MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
        {isInRole('Admin') && (
          <MenuItem href={routes.sportScoreData} onClick={() => handleNavigate(routes.sportScoreData)}>
            <ListItemIcon>
              <TableIcon fontSize="var(--icon-fontSize-md)" />
            </ListItemIcon>
            Sport Score Data
          </MenuItem>
        )}
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
