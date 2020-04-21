import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import moment from 'moment';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  inline: {
    display: 'inline',
  },
  readIcon: {
    color: '#E87424',
  },
  chipDiv: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
    marginTop: '5px',
  },
}));

const ListItemLink = props => {
  return <ListItem button component="a" {...props} />;
};

const ThreadItem = ({thread, threadKey, selectedThread, readThread}) => {
  const getFullName = employee => {
    if (employee) return employee.firstName + ' ' + employee.lastName;
    else return 'Anonymous';
  };

  const getDate = dateInput => {
    if (dateInput) {
      return moment(dateInput).format('YYYY-MM-DD h:mm A');
    }
  };

  const ListItemAvatarCustom = withStyles(theme => ({
    root: {
      minWidth: '25px',
    },
  }))(ListItemAvatar);

  const getTags = () => {
    if (thread.tags) {
      return thread.tags.map((tag, index) => {
        return (
          <li key={index} style={{listStyle: 'none'}}>
            <Chip
              variant="default"
              style={{
                backgroundColor: tag.color,
              }}
              label={tag.name}
              size="small"
            />
          </li>
        );
      });
    }
  };
  const classes = useStyles();

  return (
    <>
      <ListItemLink
        key={threadKey}
        alignItems="flex-start"
        onClick={() => {
          readThread(threadKey);
        }}
        key={threadKey}
        selected={selectedThread === threadKey}
      >
        <ListItemAvatarCustom>
          <FiberManualRecordSharpIcon
            fontSize="inherit"
            style={{fontSize: '20px'}}
            className={classes.readIcon}
          />
        </ListItemAvatarCustom>
        <ListItemText
          primary={
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textSecondary"
              >
                {getFullName(thread.createdBy)}
              </Typography>

              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textSecondary"
                style={{float: 'right'}}
              >
                {getDate(thread.latestDate)}
              </Typography>
            </>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="subtitle1"
                className={classes.inline}
                color="textPrimary"
              >
                {thread.latestText}
              </Typography>

              <ul className={classes.chipDiv}>{getTags()}</ul>
            </React.Fragment>
          }
        />
      </ListItemLink>
      <Divider variant="inset" component="li" style={{marginLeft: 0}} />
    </>
  );
};

export default ThreadItem;
