import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';
import {useStoreActions, useStoreState} from 'easy-peasy';
import Fade from '@material-ui/core/Fade';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomSnackbar = () => {
  const classes = useStyles();
  const snackState = useStoreState((state) => state.snackBarModel.snackbar);
  const hideSnackAction = useStoreActions(
    (actions) => actions.snackBarModel.hideSnack
  );

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    hideSnackAction();
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={snackState.open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        autoHideDuration={2000}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <Alert onClose={handleClose} severity={snackState.severity}>
          {snackState.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomSnackbar;
