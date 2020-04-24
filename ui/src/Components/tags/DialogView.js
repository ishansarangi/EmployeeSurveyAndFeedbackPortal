import React from 'react';
import Button from '@material-ui/core/Button';
import {useMutation, useLazyQuery} from '@apollo/react-hooks';
import {remove_tag, get_threads_for_manager} from '../apollo/Queries';
import {useStoreState, useStoreActions} from 'easy-peasy';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/core/styles';
import {useAuthUser} from '../auth/AuthUser';

const DialogView = () => {
  const DialogActionButton = withStyles((theme) => ({
    root: {
      color: '#E87424',
    },
  }))(Button);
  const {loggedInUser} = useAuthUser();
  const dialog = useStoreState((state) => state.dialogModel.dialog);
  const setDialog = useStoreActions((actions) => actions.dialogModel.setDialog);
  const removeTagFromTable = useStoreActions(
    (actions) => actions.tagList.remove
  );
  const setEmployeeThreadList = useStoreActions(
    (actions) => actions.employeeThreadList.setThreads
  );

  const [getEmployeeThreadData] = useLazyQuery(get_threads_for_manager, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setEmployeeThreadList(data.findAllReceivedThreads);
    },
    onError: (error) => {
      console.log(error);
      showSnack({
        message: 'Failed to fetch threads!',
        severity: 'error',
      });
    },
  });
  const showSnack = useStoreActions(
    (actions) => actions.snackBarModel.showSnack
  );

  const [removeTag] = useMutation(remove_tag, {
    onCompleted: (data) => {
      removeTagFromTable(data.removeTag.tagId);
      handleClose();
      if (loggedInUser.employeeId) {
        getEmployeeThreadData({
          variables: {
            employeeId: loggedInUser.employeeId,
          },
        });
      }
    },
  });

  const handleClose = () => {
    setDialog({
      open: false,
      message: '',
      id: '',
    });
  };

  const handleCloseDelete = (TagID) => {
    removeTag({
      variables: {
        tagId: TagID,
      },
    });
  };
  return (
    <Dialog
      open={dialog.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Delete Tag?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialog.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <DialogActionButton onClick={() => handleCloseDelete(dialog.id)}>
          Yes
        </DialogActionButton>
        <DialogActionButton onClick={handleClose} autoFocus>
          No
        </DialogActionButton>
      </DialogActions>
    </Dialog>
  );
};

export default DialogView;
