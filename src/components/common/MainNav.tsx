import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { Bell as BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
//import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
//import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// import { MobileNav } from './MobileNav';
import { routes } from '../../routes';
import UserActionButton from '../account/UserActionButton';
import { DynamicLogo } from '../core/Logo';

export function MainNav(): React.JSX.Element {
  //const [, setOpenNav] = React.useState<boolean>(false);

  return (
    <>
      <Box
        component="header"
        sx={{
          borderBottom: '1px solid var(--mui-palette-divider)',
          backgroundColor: 'var(--mui-palette-background-paper)',
          position: 'sticky',
          top: 0,
          zIndex: 'var(--mui-zIndex-appBar)',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', px: 2 }}
        >
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            {/* <IconButton
              onClick={(): void => {
                setOpenNav(true);
              }}
              sx={{ display: { lg: 'none' } }}
            >
              <ListIcon />
            </IconButton> */}
            <Tooltip title="Go home">
              {/* <IconButton>
                <MagnifyingGlassIcon />
              </IconButton> */}
              <Box component={RouterLink} to={routes.home} sx={{ display: 'inline-block', fontSize: 0 }} >
                <DynamicLogo colorDark="light" colorLight="dark" height={50} width={100} />
              </Box>
            </Tooltip>
          </Stack>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <Tooltip title="Contacts">
              <IconButton>
                <UsersIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <Badge badgeContent={4} color="success" variant="dot">
                <IconButton>
                  <BellIcon />
                </IconButton>
              </Badge>
            </Tooltip>
            <UserActionButton/>
          </Stack>
        </Stack>
      </Box>

      {/* <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      /> */}
    </>
  );
}
