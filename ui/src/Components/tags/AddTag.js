import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {TextField} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {orange} from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import {makeStyles} from '@material-ui/core/styles';
import ColorPicker from './ColorPicker';

const AddTag = ({handleCreateTag, text, setText, color, setColor}) => {
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

    textfield: {
      width: '85%',
      maxWidth: '85%',
      backgroundColor: theme.palette.background.paper,
    },

    colorpicker: {
      maxWidth: '10%',
      marginRight: '15%',
    },
  }));

  const classes = useStyles();
  return (
    <List className="send-container" dense={false}>
      <ListItem className={classes.root}>
        <ListItemText className={classes.textfield}>
          <TextField
            size="medium"
            className="send-input"
            placeholder="New Tag"
            multiline
            rowsMax={5}
            value={text}
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

        <ListItemSecondaryAction className={classes.colorpicker}>
          <ColorPicker setColor={setColor} color={color} />
        </ListItemSecondaryAction>

        <ListItemSecondaryAction>
          <CreateButton
            variant="contained"
            disabled={!text}
            onClick={() => handleCreateTag()}
          >
            Create
          </CreateButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
};
export default AddTag;
