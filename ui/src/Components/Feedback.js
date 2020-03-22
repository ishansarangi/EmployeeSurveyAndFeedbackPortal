import React, {useState, useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Thread from './Thread';
import MessageThreadView from './MessageThreadView';
import './Feedback.css';
import {List} from '@material-ui/core';
import {
  get_all_threads_for_employee,
  get_all_threads_for_manager,
} from './Queries';
import {UserContext} from './UserContext';
import {UserType} from './UserType';
import {useQuery} from '@apollo/react-hooks';

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
  const {userType} = useContext(UserContext);
  const [selectedThread, setSelectedThread] = useState(0);
  const get_threads = () => {
    switch (userType) {
      case UserType.Manager:
        return get_all_threads_for_manager;
      case UserType.Employee:
        return get_all_threads_for_employee;
      default:
        return get_all_threads_for_employee;
    }
  };

  const {loading, error, data} = useQuery(get_threads(), {
    variables: {employeeId: 2},
  });

  if (loading) {
    return <span>Loading...</span>;
  } else if (error) {
    console.log(error);
  }
  console.log(data);

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
              threadData={data.findAllSentThreads}
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
            threadData={data.findAllSentThreads[selectedThread]}
          />
        </div>
      </div>
    </div>
  );
};
//export default graphql(get_threads())(Feedback);
export default Feedback;
