import React, { Fragment } from 'react';
import { all_thread_data } from '../../data/TestData';
import NewThread from './NewThread';
import ThreadItem from './ThreadItem';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';
import { FeedbackType } from '../feedback/FeedbackType';
import SearchBox from './SearchBox';
const Thread = ({
  setSelectedThread,
  selectedThread,
  feedbackType,
  threadData,
  toggleFetch,
  managerList,
}) => {
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

  const wrapGridView = () => {
    if (threadData && threadData.length) {
      return (
        <GridList cellHeight={400} className={classes.gridList}>
          <SearchBox></SearchBox>
          {getThreadsView()}
        </GridList>
      );
    } else {
      return <Typography align="center">You have no messages</Typography>;
    }
  };

  const getThreadsView = () => {
    return threadData.map((thread, index) => {
      return (
        <ThreadItem
          key={index}
          setSelectedThread={setSelectedThread}
          threadKey={index}
          threadDetails={{
            read: thread.read,
            createdBy: thread.createdBy,
            latestText: thread.latestText,
            latestDate: thread.modifiedAt,
            readFlag: thread.readFlag,
            subject: thread.subject,
            sentTo: thread.sentTo,
          }}
        />
      );
    });
  };

  const classes = useStyles();

  return (
    <Fragment>
      {wrapGridView()}
      {threadData.length ? <Divider /> : <Fragment />}
      <div className={classes.newThread}>
        {feedbackType === FeedbackType.Personal && (
          <NewThread toggleFetch={toggleFetch} managerList={managerList} />
        )}
      </div>
    </Fragment>
  );
};

Thread.propTypes = {};

export default Thread;
