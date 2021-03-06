/**
 * Copyright 2020 Ishan Kumar Sarangi, Sabyasachi Mohanty, Kumar Prabhu Kalyan, Alsha Samantaray, Kirti Jha
 * Copyright 2020 Arizona State University
 * Copyright 2020 TalentMap
 *
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import React, {Fragment, useState} from 'react';
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
import {useStoreActions} from 'easy-peasy';

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const ActionButton = withStyles((theme) => ({
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
  const [color, setColor] = useState('#FF0000');
  const addTag = useStoreActions((actions) => actions.tagList.add);
  const showSnack = useStoreActions(
    (actions) => actions.snackBarModel.showSnack
  );

  const [createTag] = useMutation(create_new_tag, {
    onCompleted: (data) => {
      setText('');
      setColor('#FF0000');
      addTag(data.newTag);
      showSnack({
        message: 'Tag Created!',
        severity: 'success',
      });
    },
    onError: (data) => {
      showSnack({
        message: 'Tag Creation Failed!',
        severity: 'error',
      });
    },
  });
  const handleCreateTag = () => {
    if (loggedInUser && loggedInUser.employeeId) {
      createTag({
        variables: {
          employeeId: loggedInUser.employeeId,
          name: text,
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
