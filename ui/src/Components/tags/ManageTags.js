import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { FormControl } from '@material-ui/core';

const styles = theme => ({
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
});
const ManageTags = () => {
    const [tagOpen, setTagOpen] = useState(false);

    const handleTagOpen = () => {
        setTagOpen(true);
    };

    const handleTagClose = () => {
        setTagOpen(false);
    };

    const ActionButton = withStyles(theme => ({
        root: {
            color: '#E87424',
            backgroundColor: 'white',
            '&:hover': {
                backgroundColor: orange[100],
            },
        },
    }))(Button);

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

    const DialogTitle = withStyles(styles)(props => {
        const { children, classes, ...other } = props;
        return (
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                <Typography variant="h6">{children}</Typography>
            </MuiDialogTitle>
        );
    });

    return (
        <div>
            {/*The below button is to check the modal click open */}
            {/* <Button variant="contained" onClick={handleTagOpen} display="none">Default</Button> */}
            <Dialog
                fullWidth
                maxWidth={'sm'}
                aria-labelledby="managetags-dialog-title"
                open={tagOpen}
            >
                <DialogTitle id="managetags-dialog-title">Manage Tags</DialogTitle>
                <DialogContent dividers>
                    <FormControl margin="normal" fullWidth>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <ActionButton autoFocus onClick={handleTagClose} color="secondary">
                        Close
                    </ActionButton>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ManageTags;