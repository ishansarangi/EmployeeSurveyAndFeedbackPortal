import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
        marginLeft: '16px',
        marginRight: '16px',
        marginTop: '16px',
    },
}));

const SearchBox = () => {

    const classes = useStyles();

    return (
        <FormControl className={classes.root} >
            <TextField id="filled-search" variant="filled" placeholder="Search" size="small" fullWidth />
        </FormControl>
    );
};
SearchBox.propTypes = {};
export default SearchBox;