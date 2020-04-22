import React, {Fragment, useEffect, useState} from 'react';
import {UserType} from '../UserType';
import {FeedbackType} from './FeedbackType';
import {useAuthUser} from '../auth/AuthUser';
import ManagerPane from './ManagerPane';
import Feedback from './Feedback';
import {get_manager_hierarchy} from '../apollo/Queries';
import {useLazyQuery} from '@apollo/react-hooks';
import {useStoreActions} from 'easy-peasy';

const FeedbackContainer = props => {
  const {loggedInUser} = useAuthUser();

  const setManagerList = useStoreActions(
    actions => actions.managerList.setManagers
  );

  const [getManagerList] = useLazyQuery(get_manager_hierarchy, {
    onCompleted: data => {
      setManagerList(data.findManagerHierarchy);
    },
    onError: error => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (loggedInUser.employeeId) {
      getManagerList({
        variables: {employeeId: loggedInUser.employeeId},
      });
    }
  }, []);

  if (loggedInUser && loggedInUser.employeeId)
    return (
      <Fragment>
        {loggedInUser.userType === UserType.Manager ? (
          <ManagerPane />
        ) : (
          <div className="child-content" style={{height: 'inherit'}}>
            <Feedback feedbackType={FeedbackType.Personal} />
          </div>
        )}
      </Fragment>
    );
  return <h1>Please login</h1>;
};

export default FeedbackContainer;
