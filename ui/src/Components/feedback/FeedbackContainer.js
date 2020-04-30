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

import React, {Fragment, useEffect, useState} from 'react';
import {UserType} from '../UserType';
import {FeedbackType} from './FeedbackType';
import {useAuthUser} from '../auth/AuthUser';
import ManagerPane from './ManagerPane';
import Feedback from './Feedback';
import {get_manager_hierarchy} from '../apollo/Queries';
import {useLazyQuery} from '@apollo/react-hooks';
import {useStoreActions} from 'easy-peasy';
import CustomSnackbar from '../snackbars/CustomSnackbar';

const FeedbackContainer = (props) => {
  const {loggedInUser} = useAuthUser();

  const setManagerList = useStoreActions(
    (actions) => actions.managerList.setManagers
  );

  const [getManagerList] = useLazyQuery(get_manager_hierarchy, {
    onCompleted: (data) => {
      setManagerList(data.findManagerHierarchy);
    },
    onError: (error) => {
      console.log('Failed to fetch the manager list for the employee' + error);
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
        <CustomSnackbar />
      </Fragment>
    );
  return <h1>Please login</h1>;
};

export default FeedbackContainer;
