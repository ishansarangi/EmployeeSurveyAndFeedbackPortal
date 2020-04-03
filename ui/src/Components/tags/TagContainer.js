import React, {Fragment, useState, useEffect} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {orange} from '@material-ui/core/colors';
import {useAuthUser} from '../auth/AuthUser';
import {useMutation, useLazyQuery} from '@apollo/react-hooks';
import TagTable from './TagTable';
import AddTag from './AddTag';
import {create_new_tag, get_all_tags} from '../apollo/Queries';

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
  const [text, setText] = useState('');
  const [color, setColor] = useState('#000000');
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    getTagData();
  }, []);

  const [getTagData, {loading, refetch}] = useLazyQuery(get_all_tags, {
    fetchPolicy: 'network-only',
    onCompleted: data => {
      setTagList(data.findAllTags);
      console.log('onCompletedtagList' + JSON.stringify(data.findAllTags));
    },
    onError: error => {
      console.log(error);
    },
  });

  const updateTags = () => {
    console.log('updateTags');
    getTagData();
  };

  const [createTag, {data}] = useMutation(create_new_tag, {
    onCompleted: data => {
      setText('');
      setColor('#000000');
      updateTags();
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
          <AddTag
            handleCreateTag={handleCreateTag}
            text={text}
            setText={setText}
            color={color}
            setColor={setColor}
          />
          <TagTable rows={tagList} />
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
