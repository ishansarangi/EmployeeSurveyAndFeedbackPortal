import React from 'react';
import {allThreads} from './data/data';
import NewThread from './NewThread';
import ThreadItem from './ThreadItem';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const Thread = props => {
  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

  const getThreadsView = () => {
    console.log('getThreadsView called' + allThreads);
    return allThreads.map((thread, i) => {
      return (
        <ListItem alignItems="flex-start">
          <ThreadItem
            threadDetails={{
              sentBy: thread.sentBy,
              latestText: thread.latestText,
              latestDate: thread.latestDate,
              readFlag: thread.readFlag,
              subject: thread.subject,
              manager: thread.manager,
            }}
          />
        </ListItem>
      );
    });
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <List className={classes.root}>{getThreadsView()}</List>
      <NewThread />
    </React.Fragment>
  );
};

Thread.propTypes = {};

export default Thread;
