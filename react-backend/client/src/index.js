import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import './index.css';
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

    <App/>
</Router>, Root);
