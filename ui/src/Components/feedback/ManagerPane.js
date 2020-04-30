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

import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {FeedbackType} from './FeedbackType';
import Feedback from './Feedback';
import {useAuthUser} from '../auth/AuthUser';
import {useLazyQuery} from '@apollo/react-hooks';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {get_threads_for_manager} from '../apollo/Queries';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  main: {
    height: '90%',
    display: 'flex',
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const ManagerPane = () => {
  const classes = useStyles();
  const {loggedInUser} = useAuthUser();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const showSnack = useStoreActions(
    (actions) => actions.snackBarModel.showSnack
  );
  const setEmployeeThreadList = useStoreActions(
    (actions) => actions.employeeThreadList.setThreads
  );

  const managerCount = useStoreState((state) => state.managerList.count);

  const [getEmployeeThreadData] = useLazyQuery(get_threads_for_manager, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setEmployeeThreadList(data.findAllReceivedThreads);
    },
    onError: (error) => {
      console.log(error);
      showSnack({
        message: 'Failed to fetch threads!',
        severity: 'error',
      });
    },
  });

  useEffect(() => {
    if (loggedInUser.employeeId) {
      getEmployeeThreadData({
        variables: {
          employeeId: loggedInUser.employeeId,
        },
      });
    }
  }, []);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const feedbackView = (index) => {
    const fbType = index === 0 ? FeedbackType.Employee : FeedbackType.Personal;
    return <Feedback feedbackType={fbType} />;
  };

  return (
    <div className={classes.main}>
      <nav className="navigation-bar">
        <div className={classes.root}>
          <List component="nav" aria-label="secondary mailbox folders">
            <ListItemLink
              href="#employee-feedback"
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemText primary="Employee Feedback" />
            </ListItemLink>

            {managerCount !== 0 && (
              <ListItemLink
                href="#my-feedback"
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemText primary="My Feedback" />
              </ListItemLink>
            )}
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
