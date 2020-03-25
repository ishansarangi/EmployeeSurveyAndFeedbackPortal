import React, {useState} from 'react';
import './App.css';
import NavBar from './NavBar';
import PropTypes from 'prop-types';
import {ApolloProvider} from 'react-apollo';
import {apolloclient} from './ApolloClient';
import {UserContext} from './UserContext';
import {Route, Switch} from 'react-router-dom';
import FeedbackContainer from './FeedbackContainer';
import Login from './Login';

const NoMatch = () => {
  return (
    <div className="not-found">
      <h2>Not Found</h2>
      <p>Please click one of links on the left.</p>
    </div>
  );
};
const App = props => {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{user, setUser}}>
      <ApolloProvider client={apolloclient}>
        <div className="container">
          <NavBar />
          <Switch>
            <Route
              exact
              path="/"
              component={() => <Login setUser={setUser} />}
            />
            <Route
              path="/login"
              component={() => <Login setUser={setUser} />}
            />
            <Route path="/feedbackview" component={FeedbackContainer} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </div>
      </ApolloProvider>
    </UserContext.Provider>
  );
};

export default App;
