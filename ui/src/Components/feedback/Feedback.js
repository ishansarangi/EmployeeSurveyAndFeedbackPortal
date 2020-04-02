import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Thread from '../threadview/Thread';
import './Feedback.css';
import { List } from '@material-ui/core';
import {
  get_threads_for_employee,
  get_threads_for_manager,
  get_all_managers,
} from '../apollo/Queries';

import { UserType } from '../UserType';
import { FeedbackType } from './FeedbackType';
import { useLazyQuery } from '@apollo/react-hooks';
import { useAuthUser } from '../auth/AuthUser';
import MessageThreadView from '../messageview/MessageThreadView';

const useStyles = makeStyles(theme => ({
  root: {
    width: '99.3%',
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    position: 'inherit',
  },
  messageView: {
    height: '100%',
  },
}));

const Feedback = ({ feedbackType, managerList }) => {
  const { loggedInUser } = useAuthUser();
  const classes = useStyles();
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    if (loggedInUser.employeeId) {
      getThreadData({
        variables: { employeeId: loggedInUser.employeeId },
      });
    }
  }, []);

  const [selectedThread, setSelectedThread] = useState(-1);
  const [threads, setThreads] = useState([]);

  const get_threads_query = () => {
    if (
      feedbackType === FeedbackType.Employee &&
      loggedInUser.userType === UserType.Manager
    ) {
      return get_threads_for_manager;
    } else return get_threads_for_employee;
  };

  //TODO : Don't call the API's,
  //directly add the message to the state and remove fetch state.
  const addMessageToThread = () => { };
  const addNewThread = () => { };

  const [getThreadData, { loading, refetch }] = useLazyQuery(
    get_threads_query(),
    {
      fetchPolicy: 'network-only',
      onCompleted: data => {
        if (
          feedbackType === FeedbackType.Employee &&
          loggedInUser.userType === UserType.Manager
        )
          setThreads(data.findAllReceivedThreads);
        else setThreads(data.findAllSentThreads);
      },
      onError: error => {
        console.log(error);
      },
    }
  );

  const toggleFetch = () => {
    setFetch(!fetch);
    refetch({
      variables: { employeeId: loggedInUser.employeeId },
    });
  };

  return (
    <div className="fb-main">
      <nav className="fb-navigation-bar">
        <div className={classes.root}>
          <List
            className={classes.item}
            component="nav"
            aria-label="secondary mailbox folders"
          >
            <Thread
              setSelectedThread={setSelectedThread}
              selectedThread={selectedThread}
              feedbackType={feedbackType}
              threadData={threads}
              toggleFetch={toggleFetch}
              managerList={managerList}
            />
          </List>
        </div>
      </nav>
      <div className="fb-child-content">
        <div className={classes.messageView}>
          <MessageThreadView
            selectedThread={selectedThread}
            feedbackType={feedbackType}
            threadData={threads}
            toggleFetch={toggleFetch}
          />
        </div>
      </div>
    </div>
  );
};

export default Feedback;
