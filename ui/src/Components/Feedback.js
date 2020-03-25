import React, {useState, useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Thread from './Thread';
import MessageThreadView from './MessageThreadView';
import './Feedback.css';
import {List} from '@material-ui/core';
import {get_threads_for_employee, get_threads_for_manager} from './Queries';
import {UserContext} from './UserContext';
import {UserType} from './UserType';

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

const Feedback = props => {
  const {userType} = useContext(UserContext);

  const get_threads = () => {
    switch (userType) {
      case UserType.Employee:
        return get_threads_for_employee;
      case UserType.Manager:
        return get_threads_for_manager;
      default:
        return get_threads_for_employee;
    }
  };

  const classes = useStyles();
  const [selectedThread, setSelectedThread] = useState(0);
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
            />
          </List>
        </div>
      </nav>
      <div className="fb-child-content">
        <div className={classes.messageView}>
          <MessageThreadView
            selectedThread={selectedThread}
            feedbackType={props.feedbackType}
          />
        </div>
      </div>
    </div>
  );
};
/**
 * TODO: Replace the below export statement with this when the graphql backend is ready
 * export default graphql(get_threads())(Feedback);
 */
export default Feedback;
