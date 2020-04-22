import React from 'react';
import './App.css';
import NavBar from './NavBar';
import {ApolloProvider} from 'react-apollo';
import {apolloclient} from './apollo/ApolloClient';
import {Route, Switch} from 'react-router-dom';
import Login from './auth/Login';
import {ProtectedRoute} from './auth/ProtectedRoute';
import {AuthUserProvider} from './auth/AuthUser';
import FeedbackContainer from './feedback/FeedbackContainer';
import {CssBaseline, Container} from '@material-ui/core';
import {createStore, StoreProvider} from 'easy-peasy';
import {storeModel} from './models/Model';

const store = createStore(storeModel);

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
      <StoreProvider store={store}>
        <ApolloProvider client={apolloclient}>
          <Container maxWidth="false" style={{padding: 0, margin: 0}}>
            <CssBaseline />
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
          </Container>
        </ApolloProvider>
      </StoreProvider>
    </AuthUserProvider>
  );
};

export default App;
