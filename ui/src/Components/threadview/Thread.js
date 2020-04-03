import React, {Fragment} from 'react';
import NewThread from './NewThread';
import ThreadItem from './ThreadItem';
import {makeStyles} from '@material-ui/core/styles';
import {Divider} from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';
import SearchBox from './SearchBox';
import {FeedbackType} from '../feedback/FeedbackType';
import FilterByTag from './FilterByTag';
import {useAuthUser} from '../auth/AuthUser';
import {UserType} from '../UserType';

const Thread = ({
  setSelectedThread,
  selectedThread,
  feedbackType,
  threadData,
  toggleFetch,
  managerList,
}) => {
  const {loggedInUser} = useAuthUser();

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
      return getThreadsView();
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

  const getFilterByTagView = () => {
    if (
      loggedInUser.userType !== UserType.Employee &&
      feedbackType === FeedbackType.Employee
    )
      return <FilterByTag />;
  };

  const classes = useStyles();

  return (
    <Fragment>
      <GridList cellHeight={400} className={classes.gridList}>
        <SearchBox />
        {getFilterByTagView()}
        {wrapGridView()}
      </GridList>
      {/* {threadData.length ? <Divider /> : <Fragment />} */}

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
