import React from 'react';
import Popover from '@material-ui/core/Popover';
import PaperComponentCustom from './PaperComponentCustom';

const SimplePopover = ({
  handleClose,
  anchorEl,
  handleClick,
  handleClickOpen,
  threadId,
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
        <PaperComponentCustom
          handleClickOpen={handleClickOpen}
          threadId={threadId}
        />
      </Popover>
    </div>
  );
};
export default SimplePopover;
