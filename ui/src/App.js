import React, { useState } from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import ManagerPane from './Components/ManagerPane';
import PropTypes from 'prop-types';
import Feedback from './Components/Feedback';
import { UserContext } from './Components/UserContext';

const App = (props) => {
    const [page, setPageName] = useState("NotSet");
    const handleClick = (name) => {
        setPageName(name);
        console.log("Page selected :" + name);
    };

    return (
        <UserContext.Provider value={page}>
            <div >
                <NavBar page={page} onClick={(name) => handleClick(name)} />
                <ManagerPane props={props} />
            </div>

        </UserContext.Provider>
    );
}

App.propTypes = {
    children: PropTypes.element.isRequired
};

export default App;
