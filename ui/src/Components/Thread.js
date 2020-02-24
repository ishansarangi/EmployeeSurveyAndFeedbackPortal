import React from 'react';
import {all_thread_data} from '../data/TestData';
import NewThread from './NewThread';
import ThreadItem from './ThreadItem';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const Thread = ({setSelectedThread, selectedThread}) => {
  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    newThread: {
      width: 200,
      height: 80,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }));

  const getThreadsView = () => {
    console.log('getThreadsView called' + all_thread_data);
    return all_thread_data.map((thread, index) => {
      return (
        <ListItem alignItems="flex-start">
          <ThreadItem
            setSelectedThread={setSelectedThread}
            threadKey={index}
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
      <div className={classes.newThread}>
        <NewThread />
      </div>
    </React.Fragment>
  );
};

Thread.propTypes = {};

export default Thread;
