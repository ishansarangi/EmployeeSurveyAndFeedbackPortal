import React from 'react';
import './App.css';
import NavBar from './NavBar';
import ManagerPane from './ManagerPane';
import PropTypes from 'prop-types';

const App = props => {
  return (
    <div>
      <NavBar />
      <ManagerPane props={props} />
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
