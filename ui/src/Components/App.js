import React, {useState} from 'react';
import './App.css';
import NavBar from './NavBar';
import ManagerPane from './ManagerPane';
import PropTypes from 'prop-types';
import Feedback from './Feedback';
import {ApolloProvider} from 'react-apollo';
import {apolloclient} from './ApolloClient';
import {UserContext} from './UserContext';
import {UserType} from './UserType';

const App = props => {
  const [userType, setUserType] = useState(UserType.Employee);

  return (
    <UserContext.Provider value={{userType, setUserType}}>
      <ApolloProvider client={apolloclient}>
        <div>
          <NavBar />
          {userType === UserType.Manager ? (
            <ManagerPane props={props} />
          ) : (
            <div className="child-content">
              <Feedback />
            </div>
          )}
        </div>
      </ApolloProvider>
    </UserContext.Provider>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
