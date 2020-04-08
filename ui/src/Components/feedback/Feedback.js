import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ThreadView from '../threadview/ThreadView';
import './Feedback.css';
import {get_all_tags, get_threads_for_employee} from '../apollo/Queries';
import {UserType} from '../UserType';
import {FeedbackType} from './FeedbackType';
import {useLazyQuery} from '@apollo/react-hooks';
import {useAuthUser} from '../auth/AuthUser';
import MessageThreadView from '../messageview/MessageThreadView';
import {useStoreActions, useStoreState} from 'easy-peasy';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    position: 'inherit',
  },
  messageView: {
    height: '100%',
  },
}));

const Feedback = ({feedbackType, managerList}) => {
  const {loggedInUser} = useAuthUser();
  const classes = useStyles();
  const setTags = useStoreActions(actions => actions.tagList.setTags);

  const employeeThreads = useStoreState(
    state => state.employeeThreadList.threads
  );
  const personalThreads = useStoreState(
    actions => actions.personalThreadList.threads
  );

  const [getTagData] = useLazyQuery(get_all_tags, {
    fetchPolicy: 'network-only',
    onCompleted: data => {
      setTags(data.findAllTags);
    },
    onError: error => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (loggedInUser.employeeId) {
      getPersonalThreadData({
        variables: {employeeId: loggedInUser.employeeId},
      });
      getTagData();
    }
  }, []);

  const [selectedThread, setSelectedThread] = useState(-1);

  const setPersonalThreadList = useStoreActions(
    actions => actions.personalThreadList.setThreads
  );

  const [getPersonalThreadData] = useLazyQuery(get_threads_for_employee, {
    fetchPolicy: 'network-only',
    onCompleted: data => {
      setPersonalThreadList(data.findAllSentThreads);
    },
    onError: error => {
      console.log(error);
    },
  });

  const getThreads = () => {
    if (
      feedbackType === FeedbackType.Employee &&
      loggedInUser.userType === UserType.Manager
    ) {
      return employeeThreads;
    }
    return personalThreads;
  };

  const getThreadById = selectedThread => {
    if (
      feedbackType === FeedbackType.Employee &&
      loggedInUser.userType === UserType.Manager
    ) {
      return employeeThreads.find(thread => {
        return thread.threadId === selectedThread;
      });
    }
    return personalThreads.find(thread => {
      return thread.threadId === selectedThread;
    });
  };

  return (
    <div className="fb-main">
      <nav className="fb-navigation-bar">
        <ThreadView
          setSelectedThread={setSelectedThread}
          selectedThread={selectedThread}
          feedbackType={feedbackType}
          threadData={getThreads()}
          managerList={managerList}
        />
      </nav>
      <div className="fb-child-content">
        <div className={classes.messageView}>
          <MessageThreadView
            selectedThread={selectedThread}
            feedbackType={feedbackType}
            threadData={getThreadById(selectedThread)}
          />
        </div>
      </div>
    </div>
  );
};

export default Feedback;
