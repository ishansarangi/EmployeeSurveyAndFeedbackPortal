import React from 'react';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import ColorGrid from './ColorGrid';

const ColorPicker = ({setColor, color}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        style={{
          backgroundColor: color,
          maxWidth: '30px',
          maxHeight: '30px',
          minWidth: '30px',
          minHeight: '30px',
        }}
        aria-describedby={id}
        onClick={handleClick}
        variant="contained"
      ></Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <ColorGrid setColor={setColor} handleClose={handleClose} />
      </Popover>
    </div>
  );
};

export default ColorPicker;
