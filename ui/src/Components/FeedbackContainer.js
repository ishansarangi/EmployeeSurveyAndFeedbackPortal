import React, {useContext, Fragment} from 'react';
import ManagerPane from './ManagerPane';
import {UserContext} from './UserContext';
import {UserType} from './UserType';
import {FeedbackType} from './FeedbackType';
import Feedback from './Feedback';

const FeedbackContainer = props => {
  const {user} = useContext(UserContext);

  return (
    <Fragment>
      {user.userType === UserType.Manager ? (
        <ManagerPane props={props} />
      ) : (
        <div className="child-content" style={{height: 'inherit'}}>
          <Feedback feedbackType={FeedbackType.Personal} createFlag={true} />
        </div>
      )}
    </Fragment>
  );
};

export default FeedbackContainer;
