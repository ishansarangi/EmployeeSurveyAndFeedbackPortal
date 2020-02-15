import React from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import NewThread from './Components/NewThread';

const App = () => {
    return (
        <div>
            <NavBar/>
            <NewThread/>
        </div>
    );
}

export default App;
