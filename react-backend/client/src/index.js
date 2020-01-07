import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router-dom';
import App from './App';
import {createBrowserHistory} from 'history';
import TagManager from 'react-gtm-module'

const history = createBrowserHistory();
const tagManagerArgs = {
    gtmId: 'GTM-PPBS6FW'
}

TagManager.initialize(tagManagerArgs);

const Root = document.getElementById('root')

ReactDOM.hydrate(

    <Router history={history}>
        <Route path="/">
        <App/>
        </Route>
  
</Router>, Root);
