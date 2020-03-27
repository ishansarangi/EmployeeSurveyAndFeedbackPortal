import React from 'react';
import './message.css';
import {withStyles} from '@material-ui/core/styles';
import {TextField} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import {orange} from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import {makeStyles} from '@material-ui/core/styles';

const TextBox = ({setText, handleSubmit}) => {
  const CreateButton = withStyles(theme => ({
    root: {
      color: '#ffffff',
      backgroundColor: '#E87424',
      '&:hover': {
        backgroundColor: orange[600],
      },
    },
  }))(Button);

  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: '95%',
      backgroundColor: theme.palette.background.paper,
    },
  }));

  const classes = useStyles();
  return (
    <List className="send-container" dense={false}>
      <ListItem className={classes.root}>
        <ListItemText>
          <TextField
            size="medium"
            fullWidth
            className="send-input"
            placeholder="Type Something..."
            multiline
            rowsMax={5}
            inputProps={{
              style: {
                padding: 5,
              },
            }}
            onChange={event => {
              event.preventDefault();
              setText(event.target.value);
            }}
          />
        </ListItemText>

        <ListItemSecondaryAction>
          <CreateButton variant="contained">
            <SendIcon style={{color: '#FFF'}} onClick={handleSubmit}></SendIcon>
          </CreateButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
};
TextBox.propTypes = {};
export default TextBox;
