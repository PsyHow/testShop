import React, { FC } from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';

import { setAppError } from 'bll';
import { selectError } from 'selectors';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export const ErrorSnackbar: FC = () => {
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const handleClose = (event?: React.SyntheticEvent, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAppError({ error: null }));
  };

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={() => handleClose()}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
};
