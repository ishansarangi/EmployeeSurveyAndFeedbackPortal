import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Thread from './Thread';
import MessageThreadView from './MessageThreadView';
import './Feedback.css';
import {List} from '@material-ui/core';
import {graphql} from 'react-apollo';
import {get_all_employee_threads, get_all_manager_threads} from './Queries';

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
          <MessageThreadView selectedThread={selectedThread} />
        </div>
      </div>
    </div>
  );
};
/**
 * TODO: Replace the below export statement with this when the graphql backend is ready
 * export default graphql(getAllThreadsQuery)(Feedback);
 */
export default Feedback;
