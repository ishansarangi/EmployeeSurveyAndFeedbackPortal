import React, {Children} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import TagContainer from '../tags/TagContainer';

const useStyles = makeStyles(theme => ({
  root: {
    width: 500,
  },
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function CustomPopper(options) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const classes = useStyles();
  const {containerProps, children} = options;

  const handleClick = newPlacement => event => {
    setAnchorEl(event.currentTarget);
    setOpen(prev => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <div className={classes.root}>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
        {...containerProps}
      >
        {({TransitionProps}) => (
          <Fade {...TransitionProps} timeout={350}></Fade>
        )}
      </Popper>
      <Button onClick={handleClick('left-start')}>left-start</Button>
    </div>
  );
}
