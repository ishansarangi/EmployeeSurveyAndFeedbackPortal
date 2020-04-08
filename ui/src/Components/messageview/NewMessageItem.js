import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';

const useStyles = makeStyles(theme => ({
  message: {},
  right: {},
  left: {},
  messageText: {
    padding: 16,
    float: 'right',
    clear: 'both',
    borderRadius: 4,
    position: 'relative',
    fontSize: 14,
  },
  messageTitle: {},
}));

const NewMessageItem = ({msg}) => {
  const getDate = dateInput => {
    if (dateInput) {
      return moment(dateInput).format('YYYY-MM-DD h:mm A');
    }
  };

  const getFullName = employee => {
    if (employee) return employee.firstName + ' ' + employee.lastName;
    else return 'Anonymous';
  };
  const classes = useStyles();
  return (
    <ListItem>
      <ListItemText
        className={classes.messageText}
        primary={
          <>
            <Typography
              component="span"
              variant="body2"
              //className={classes.inline}
              color="textSecondary"
              style={{display: 'inline'}}
            >
              {getFullName(msg.sentBy)}
            </Typography>

            <Typography
              component="span"
              variant="body2"
              //className={classes.inline}
              color="textSecondary"
              style={{float: 'right', display: 'inline', marginLeft: 15}}
            >
              {getDate(msg.createdAt)}
            </Typography>
          </>
        }
        secondary={
          <Typography
            component="span"
            variant="subtitle1"
            //className={classes.inline}
            color="textPrimary"
            style={{display: 'inline'}}
          >
            {msg.text}
          </Typography>
        }
      />
    </ListItem>
  );
};

NewMessageItem.propTypes = {};

export default NewMessageItem;
