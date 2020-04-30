/**
 * Copyright 2020 Ishan Kumar Sarangi, Sabyasachi Mohanty, Kumar Prabhu Kalyan, Alsha Samantaray, Kirti Jha
 * Copyright 2020 Arizona State University
 * Copyright 2020 TalentMap
 *
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import React, {useState, useEffect} from 'react';
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
import useDebounce from '../util/UseDebounce';

const ThreadView = ({selectedThread, feedbackType, threadData, readThread}) => {
  const {loggedInUser} = useAuthUser();
  const [tagFilter, setTagFilter] = useState([]);
  const [searchText, setSearchText] = useState('');

  const debouncedSearchTerm = useDebounce(searchText, 500);

  const some1 = useStoreState((state) =>
    state.employeeThreadList.filterThreads(tagFilter, debouncedSearchTerm)
  );

  const some2 = useStoreState((state) =>
    state.personalThreadList.filterThreads(debouncedSearchTerm)
  );

  if (
    feedbackType === FeedbackType.Employee &&
    loggedInUser.userType === UserType.Manager
  ) {
    if ((tagFilter && tagFilter.length) || debouncedSearchTerm) {
      threadData = some1;
    }
  } else {
    threadData = some2;
  }

  const useStyles = makeStyles((theme) => ({
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
      height: '100%',
      overflow: 'hidden',
      overflowY: 'scroll',
      paddingBottom: '100px',
    },
    threadContainerFull: {
      maxHeight: 620,
    },
  }));

  const wrapGridView = () => {
    if (threadData && threadData.length) {
      return getThreadsView();
    } else {
      return <Typography align="center">You have no messages</Typography>;
    }
  };

  const isRead = (thread) => {
    if (feedbackType === FeedbackType.Personal) {
      return thread.messages[thread.messages.length - 1].messageSender !== 1
        ? typeof thread.readByEmployee === 'undefined'
          ? false
          : thread.readByEmployee.indexOf(loggedInUser.employeeId) > -1 ||
            thread.readByEmployee.indexOf(Number(loggedInUser.employeeId)) > -1
        : true;
    } else {
      return thread.messages[thread.messages.length - 1].messageSender !== 2
        ? typeof thread.readByManagers === 'undefined'
          ? false
          : thread.readByManagers.indexOf(loggedInUser.employeeId) > -1 ||
            thread.readByManagers.indexOf(Number(loggedInUser.employeeId)) > -1
        : true;
    }
  };
  const getThreadsView = () => {
    return threadData.map((thread, index) => {
      return (
        <ThreadItem
          key={index}
          selectedThread={selectedThread}
          readThread={readThread}
          threadKey={thread.threadId}
          thread={{
            read: isRead(thread),
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

  const PaperCustom = withStyles((theme) => ({
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
          <SearchBox setSearchText={setSearchText} />
          {getFilterByTagView()}
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            marginBottom: '80px',
          }}
        >
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
            {feedbackType === FeedbackType.Personal && <NewThread />}
          </PaperCustom>
        </Grid>
      </Grid>
    </>
  );
};

ThreadView.propTypes = {};

export default ThreadView;
