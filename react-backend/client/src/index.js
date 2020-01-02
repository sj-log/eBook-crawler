import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

export const BASE_URL =
process.env.NODE_ENV !=="production"? "http://localhost:8000": "https://node-lambda-theta-ten.now.sh";

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
