import React from 'react';
import {NavLink} from 'react-router-dom';

const NavigationLink = props => {
  return <NavLink {...props} activeClassName="active" />;
};

export default NavigationLink;
