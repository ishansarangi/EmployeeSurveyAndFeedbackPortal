import React, {Fragment, useEffect, useState} from 'react';
import {UserType} from '../UserType';
import {FeedbackType} from './FeedbackType';
import {useAuthUser} from '../auth/AuthUser';
import ManagerPane from './ManagerPane';
import Feedback from './Feedback';
import {get_all_managers} from '../apollo/Queries';
import {useLazyQuery} from '@apollo/react-hooks';
import {createStore, StoreProvider} from 'easy-peasy';
import {storeModel} from '../models/Model';

const store = createStore(storeModel);

const FeedbackContainer = props => {
  const {loggedInUser} = useAuthUser();
  const [managerList, setManagerList] = useState([]);

  const [getManagerList] = useLazyQuery(get_all_managers, {
    onCompleted: data => {
      setManagerList(data.findAllManagers);
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
        <StoreProvider store={store}>
          {loggedInUser.userType === UserType.Manager ? (
            <ManagerPane managerList={managerList} />
          ) : (
            <div className="child-content" style={{height: 'inherit'}}>
              <Feedback
                feedbackType={FeedbackType.Personal}
                managerList={managerList}
              />
            </div>
          )}
        </StoreProvider>
      </Fragment>
    );
  return <h1>Please login</h1>;
};

export default FeedbackContainer;
