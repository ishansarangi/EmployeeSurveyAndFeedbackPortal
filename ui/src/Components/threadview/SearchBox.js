import React from 'react';
import {TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {FormControl} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: '8px',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));

const SearchBox = () => {
  const classes = useStyles();

  return (
    <FormControl variant="filled" className={classes.root}>
      <TextField
        id="filled-search"
        label="Search"
        type="search"
        variant="filled"
      />
    </FormControl>
  );
};
SearchBox.propTypes = {};
export default SearchBox;
