import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {FormControl, TextField} from "@material-ui/core";


const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    },

    floatingLabelFocusStyle: {
      color: "green"
  }
});

const DialogTitle = withStyles(styles)(props => {
    const {
        children,
        classes,
        onClose,
        ...other
    } = props;
    return (
        <MuiDialogTitle disableTypography
            className={
                classes.root
            }
            {...other}>
            <Typography variant="h6">
                {children}</Typography>
            {
            onClose ? (
                <IconButton aria-label="close"
                    className={
                        classes.closeButton
                    }
                    onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null
        } </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    }
}))(MuiDialogContent);

const NewThread = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary"
                onClick={handleClickOpen}>
                Create New Thread
            </Button>
            <Dialog 
                fullWidth={'xl'}
                maxWidth={'sm'}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}>
                <DialogTitle id="customized-dialog-title"
                    onClose={handleClose}>
                    New Thread
                </DialogTitle>
                <DialogContent dividers>
                    <FormControl margin="normal" fullWidth>
                        <TextField id="filled-basic" label="Subject" variant="filled" floatingLabelFocusStyle={styles.floatingLabelFocusStyle}/>
                    </FormControl>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default NewThread;
