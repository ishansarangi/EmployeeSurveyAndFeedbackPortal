import React, {Fragment} from 'react';
import {all_thread_data} from '../data/TestData';
import NewThread from './NewThread';
import ThreadItem from './ThreadItem';
import {makeStyles} from '@material-ui/core/styles';
import {Divider} from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import {FeedbackType} from './FeedbackType';

const Thread = ({setSelectedThread, selectedThread, feedbackType}) => {
  const useStyles = makeStyles(theme => ({
    container: {
      height: '85px',
      padding: 0,
      background: 'white',
    },
    gridList: {
      height: '85px',
      padding: 0,
      overflow: 'initial',
      background: 'white',
      margin: '0px',
      width: 'inherit',
    },
    newThread: {
      width: '100%',
      position: 'absolute',
      bottom: 0,
      padding: '16px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }));

  const getThreadsView = () => {
    return all_thread_data.map((thread, index) => {
      return (
        <ThreadItem
          key={index}
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
      );
    });
  };

  const classes = useStyles();

  return (
    <Fragment>
      <GridList cellHeight={400} className={classes.gridList}>
        {getThreadsView()}
      </GridList>
      <Divider />
      <div className={classes.newThread}>
        {feedbackType === FeedbackType.Personal && <NewThread />}
      </div>
    </Fragment>
  );
};

Thread.propTypes = {};

export default Thread;
