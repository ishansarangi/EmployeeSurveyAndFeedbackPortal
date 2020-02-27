import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import {HashRouter, Route, Switch} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Feedback from './Components/Feedback';

function NoMatch() {
  return (
    <div className="not-found">
      <h2>Not Found</h2>
      <p>Please click one of links on the left.</p>
    </div>
  );
}

ReactDOM.render(
  <HashRouter>
    <App>
      <Switch>
        <Route exact path="/" />
        <Route path="/my-feedback" component={Feedback} />
        <Route path="/employee-feedback" component={Feedback} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </App>
  </HashRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
