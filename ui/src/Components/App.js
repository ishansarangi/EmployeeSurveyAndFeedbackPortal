import React from 'react';
import './App.css';
import NavBar from './NavBar';
import ManagerPane from './ManagerPane';
import PropTypes from 'prop-types';
import Feedback from './Feedback';

const App = props => {
  return (
    <div>
      <NavBar />
      {/* <ManagerPane props={props} /> */}
      <Feedback />
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
