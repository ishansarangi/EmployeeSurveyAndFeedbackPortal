import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {FeedbackType} from './FeedbackType';
import Feedback from './Feedback';

import {useAuthUser} from '../auth/AuthUser';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const ManagerPane = ({managerList}) => {
  const {loggedInUser} = useAuthUser();
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const feedbackView = index => {
    if (index === 0) {
      return (
        <Feedback
          managerList={managerList}
          feedbackType={FeedbackType.Employee}
        />
      );
    }
    return (
      <Feedback
        managerList={managerList}
        feedbackType={FeedbackType.Personal}
      />
    );
  };

  return (
    <div className="main">
      <nav className="navigation-bar">
        <div className={classes.root}>
          <List component="nav" aria-label="secondary mailbox folders">
            <ListItemLink
              href="#employee-feedback"
              selected={selectedIndex === 0}
              onClick={event => handleListItemClick(event, 0)}
            >
              <ListItemText primary="Employee Feedback" />
            </ListItemLink>
            <ListItemLink
              href="#my-feedback"
              selected={selectedIndex === 1}
              onClick={event => handleListItemClick(event, 1)}
            >
              <ListItemText primary="My Feedback" />
            </ListItemLink>
          </List>
        </div>
      </nav>
      <div className="child-content">
        {/* need to remove feedback and update using props */}
        {feedbackView(selectedIndex)}
      </div>
    </div>
  );
};

export default ManagerPane;
