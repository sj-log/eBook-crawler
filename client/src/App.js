import React from 'react';
import {Route, Switch } from 'react-router-dom';
import Index from './pages/Index.js'


export default function App() {
    return (
        <Switch>
            <Route path="/"  component={Index}/>
            {/* <Route path="/search" component={Result}/> */}
        </Switch>
    );
}

