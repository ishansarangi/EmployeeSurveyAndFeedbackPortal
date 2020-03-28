import React, {useState, useEffect, useContext} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {FormControl, TextField} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import {orange} from '@material-ui/core/colors';
import {create_new_thread} from '../apollo/Queries';
import {useLazyQuery, useMutation} from '@apollo/react-hooks';
import ManagerSelect from './ManagerSelect';
import {useAuthUser} from '../auth/AuthUser';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  floatingLabelFocusStyle: {
    color: 'green',
  },
  separator: {
    marginTop: theme.spacing(1),
  },
  menuStyle: {
    border: '1px solid black',
    borderRadius: '5%',
    backgroundColor: 'lightgrey',
  },
});

const DialogTitle = withStyles(styles)(props => {
  const {children, classes, onClose, ...other} = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}{' '}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const CreateButton = withStyles(theme => ({
  root: {
    color: '#ffffff',
    width: '100%',
    backgroundColor: '#E87424',
    '&:hover': {
      backgroundColor: orange[600],
    },
  },
}))(Button);

const ActionButton = withStyles(theme => ({
  root: {
    color: '#E87424',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: orange[100],
    },
  },
}))(Button);

const NewThread = ({toggleFetch, managerList}) => {
  const {loggedInUser} = useAuthUser();
  const [open, setOpen] = useState(false);
  const [manager, setManager] = useState('');
  const [body, setBody] = useState('');
  const [subject, setSubject] = useState('');
  const [hasManagerError, setManagerError] = useState(false);
  const [hasSubjectError, setSubjectError] = useState(false);
  const [hasBodyError, setBodyError] = useState(false);
  const [createThread, {data}] = useMutation(create_new_thread, {
    onCompleted: data => {
      console.log('createThread threadId: ' + data.newThread.threadId);
      toggleFetch();
    },
  });

  const handleManagerSelection = event => {
    if (event.length === 0) {
      setManager('');
    } else {
      setManager(event[0].employeeId);
    }
    setManagerError(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSubjectError(false);
    setManagerError(false);
    setBodyError(false);
    clearFormFields();
  };

  const clearFormFields = () => {
    setManager('');
    setBody('');
    setSubject('');
  };

  const handleSubmit = event => {
    if (subject === '') setSubjectError(true);
    else if (manager === '') setManagerError(true);
    else if (body === '') setBodyError(true);
    else {
      createThread({
        variables: {
          to_employeeId: manager,
          subject: subject,
          from_employeeId: loggedInUser.employeeId,
          text: body,
        },
      });
      handleClose();
    }
  };

  return (
    <div>
      <CreateButton color="primary" onClick={handleClickOpen} display="none">
        New Thread
      </CreateButton>

      <Dialog
        fullWidth
        maxWidth={'sm'}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title">New Thread</DialogTitle>
        <DialogContent dividers>
          <FormControl margin="normal" fullWidth>
            <TextField
              id="filled-basic"
              label="Subject"
              variant="filled"
              onChange={event => {
                event.preventDefault();
                setSubjectError(false);
                setSubject(event.target.value);
              }}
            />
            {hasSubjectError && (
              <FormHelperText error="true" focused={hasSubjectError}>
                Please set a subject for the message.
              </FormHelperText>
            )}
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <ManagerSelect
              managerList={managerList}
              handleManagerSelection={handleManagerSelection}
            />
            {hasManagerError && (
              <FormHelperText error focused={hasManagerError}>
                Please select a manager for the message.
              </FormHelperText>
            )}
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <TextField
              label="Message"
              variant="filled"
              multiline={true}
              rows={10}
              rowsMax={10}
              onChange={event => {
                event.preventDefault();
                setBodyError(false);
                setBody(event.target.value);
              }}
            />
            {hasBodyError && (
              <FormHelperText error="true" focused={hasBodyError}>
                Please set a body for the message.
              </FormHelperText>
            )}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <ActionButton autoFocus onClick={handleClose} color="secondary">
            Cancel
          </ActionButton>
          <ActionButton autoFocus onClick={handleSubmit} color="secondary">
            Send
          </ActionButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewThread;
