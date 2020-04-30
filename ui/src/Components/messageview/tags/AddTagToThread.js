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
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TagContainer from '../../tags/TagContainer';
import TagArray from './TagArray';
import ManageTagsPopover from './ManageTagsPopover';

const ListItemCustom = withStyles((theme) => ({
  gutters: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  secondaryAction: {
    paddingRight: 0,
  },
}))(ListItem);

const CreateButton = withStyles((theme) => ({
  root: {
    color: '#E87424',
  },
}))(Button);

const MuiFilledInputCustom = makeStyles(
  {
    underline: {
      '&&&:before': {
        borderBottom: 'none',
      },
      '&&:after': {
        borderBottom: 'none',
      },
    },
  },
  {name: 'MuiFilledInput'}
);

function loadCustomStyles() {
  MuiFilledInputCustom();
}

const AddTagToThread = ({threadData}) => {
  loadCustomStyles();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenPopper = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopper = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <TagContainer open={open} handleClose={handleClose} />
      <List style={{marginBottom: '-20px'}} dense={false}>
        <ListItemCustom>
          <ListItemText>
            <TagArray
              tagData={threadData.tags}
              threadId={threadData.threadId}
            />
          </ListItemText>
          <ListItemSecondaryAction>
            <ManageTagsPopover
              handleClick={handleOpenPopper}
              handleClose={handleClosePopper}
              handleClickOpen={handleClickOpen}
              threadData={threadData}
              anchorEl={anchorEl}
            />
            <CreateButton onClick={handleOpenPopper}>ADD TAG</CreateButton>
          </ListItemSecondaryAction>
        </ListItemCustom>
      </List>
    </Fragment>
  );
};

export default AddTagToThread;
