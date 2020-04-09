import React, {useState} from 'react';
import NewThread from './NewThread';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SearchBox from './SearchBox';
import {FeedbackType} from '../feedback/FeedbackType';
import FilterByTag from './FilterByTag';
import {useAuthUser} from '../auth/AuthUser';
import {UserType} from '../UserType';
import Paper from '@material-ui/core/Paper';
import ThreadItem from './ThreadItem';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import {useStoreState} from 'easy-peasy';

const ThreadView = ({
  selectedThread,
  setSelectedThread,
  feedbackType,
  threadData,
  managerList,
}) => {
  const {loggedInUser} = useAuthUser();
  const [tagFilter, setTagFilter] = useState([]);

  const some1 = useStoreState(state =>
    state.employeeThreadList.filterThreads(tagFilter, '')
  );

  if (
    feedbackType === FeedbackType.Employee &&
    loggedInUser.userType === UserType.Manager
  ) {
    if (tagFilter && tagFilter.length) {
      threadData = some1;
    }
  }

  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
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

    threadContainer: {
      overflow: 'auto',
    },
    threadContainerFull: {
      maxHeight: 750,
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
          selectedThread={selectedThread}
          setSelectedThread={setSelectedThread}
          threadKey={thread.threadId}
          thread={{
            read: thread.read,
            createdBy: thread.createdBy,
            latestText: thread.latestText,
            latestDate: thread.modifiedAt,
            readFlag: thread.readFlag,
            subject: thread.subject,
            sentTo: thread.sentTo,
            tags: thread.tags,
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
      return <FilterByTag setTagFilter={setTagFilter} />;
  };

  const PaperCustom = withStyles(theme => ({
    outlined: {
      border: 0,
    },
  }))(Paper);

  const classes = useStyles();
  return (
    <>
      <Grid
        container
        style={{
          align: 'center',
          justify: 'center',
        }}
        spacing={1}
      >
        <Grid
          item
          xs={12}
          style={{
            height: 'fit-content',
          }}
        >
          <SearchBox />
          {getFilterByTagView()}
        </Grid>
        <Grid item xs={12}>
          <PaperCustom
            square
            variant="outlined"
            className={clsx(
              classes.threadContainer,
              feedbackType === FeedbackType.Personal &&
                classes.threadContainerFull
            )}
          >
            <List className={classes.root}>{wrapGridView()}</List>
          </PaperCustom>
        </Grid>

        <Grid item xs={12}>
          <PaperCustom
            className="footer"
            style={{
              position: 'absolute',
              bottom: 0,
              marginBottom: '5%',
              width: '300px',
              marginLeft: '3%',
              marginRight: '3%',
            }}
          >
            {feedbackType === FeedbackType.Personal && (
              <NewThread managerList={managerList} />
            )}
          </PaperCustom>
        </Grid>
      </Grid>
    </>
  );
};

ThreadView.propTypes = {};

export default ThreadView;
