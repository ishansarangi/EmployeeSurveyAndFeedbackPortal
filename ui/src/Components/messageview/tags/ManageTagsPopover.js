import React from 'react';
import Popover from '@material-ui/core/Popover';
import TagListContainer from './TagListContainer';

const ManageTagsPopover = ({
  handleClose,
  anchorEl,
  handleClick,
  handleClickOpen,
  threadData,
}) => {
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <TagListContainer
          handleClickOpen={handleClickOpen}
          threadData={threadData}
        />
      </Popover>
    </div>
  );
};
export default ManageTagsPopover;
