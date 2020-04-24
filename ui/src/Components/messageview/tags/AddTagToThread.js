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
