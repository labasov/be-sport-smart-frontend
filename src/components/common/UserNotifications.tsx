import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNotificationStore } from '../../stores/NotificationStore';

export default function UserNotifications() {
  const [open, setOpen] = React.useState(false);
  const { notifications } = useNotificationStore();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    console.log('closing');
    setOpen(false);
  };

  React.useEffect(() => {
    setOpen(!!notifications.length); 
  }, [notifications]);

  return (
    <div>
      <Button onClick={handleClick}>Open Snackbar</Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <div>
        {notifications.map((notification) => (
          <Alert
            key={notification.message}
            onClose={handleClose}
            severity={notification.type}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        ))}
        </div>
      </Snackbar>
    </div>
  );
}