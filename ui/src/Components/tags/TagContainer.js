import React, {Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {orange} from '@material-ui/core/colors';
import {useAuthUser} from '../auth/AuthUser';
import {useMutation} from '@apollo/react-hooks';
import TagTable from './TagTable';
import AddTag from './AddTag';
import {create_new_tag} from '../apollo/Queries';

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

const ActionButton = withStyles(theme => ({
  root: {
    color: '#E87424',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: orange[100],
    },
  },
}))(Button);

const TagContainer = ({handleClose, open}) => {
  const {loggedInUser} = useAuthUser();
  const [createTag, {data}] = useMutation(create_new_tag, {
    onCompleted: data => {
      console.log(data);
    },
  });
  const handleCreateTag = (color, name) => {
    if (loggedInUser && loggedInUser.employeeId) {
      createTag({
        variables: {
          employeeId: loggedInUser.employeeId,
          name: name,
          color: color,
        },
      });
    }
  };

  return (
    <Fragment>
      <Dialog
        fullWidth
        maxWidth={'sm'}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title">Manage Tags</DialogTitle>
        <DialogContent dividers>
          <AddTag handleCreateTag={handleCreateTag} />
          <TagTable />
        </DialogContent>
        <DialogActions>
          <ActionButton autoFocus onClick={handleClose} color="secondary">
            CLOSE
          </ActionButton>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default TagContainer;
