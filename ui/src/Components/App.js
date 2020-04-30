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

const App = (props) => {
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
