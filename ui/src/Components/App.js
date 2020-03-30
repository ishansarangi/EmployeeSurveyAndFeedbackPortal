import React, {useState} from 'react';
import './App.css';
import NavBar from './NavBar';
import PropTypes from 'prop-types';
import {ApolloProvider} from 'react-apollo';
import {apolloclient} from './apollo/ApolloClient';
import {Route, Switch} from 'react-router-dom';
import Login from './auth/Login';
import {ProtectedRoute} from './auth/ProtectedRoute';
import {AuthUserProvider} from './auth/AuthUser';
import FeedbackContainer from './feedback/FeedbackContainer';

const NoMatch = () => {
  return (
    <div className="not-found">
      <h2>Not Found</h2>
      <p>Please select other options.</p>
    </div>
  );
};

const App = props => {
  return (
    <AuthUserProvider>
      <ApolloProvider client={apolloclient}>
        <div className="container">
          <NavBar />
          <Switch>
            <Route exact path="/" component={() => <Login />} />
            <Route path="/login" component={() => <Login />} />
            <ProtectedRoute
              exact
              path="/feedbackview"
              component={FeedbackContainer}
            />
            <Route path="*" component={NoMatch} />
          </Switch>
        </div>
      </ApolloProvider>
    </AuthUserProvider>
  );
};

export default App;
