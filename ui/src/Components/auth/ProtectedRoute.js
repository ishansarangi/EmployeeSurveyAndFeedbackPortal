import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useAuthUser} from './AuthUser';

export const ProtectedRoute = ({component: Component, ...rest}) => {
  const {loggedInUser} = useAuthUser();

  return (
    <Route
      {...rest}
      render={props => {
        if (loggedInUser && loggedInUser.employeeId) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
