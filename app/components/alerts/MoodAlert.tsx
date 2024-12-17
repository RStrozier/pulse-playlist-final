"use client";

import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useToggle } from '@/app/context/ToggleContext';

// Material UI alert!
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MoodAlert = () => {
  const { alertOpen, handleAlertClose } = useToggle(); 

  return (
    <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
      <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
        Please select a mood to generate a playlist!
      </Alert>
    </Snackbar>
  );
};

export default MoodAlert;