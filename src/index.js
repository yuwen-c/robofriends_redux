import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import './index.css';
import App from './container/App';
import 'tachyons';
import * as serviceWorker from './serviceWorker';
import { searchRobots, loadRobots } from './reducers';

const logger = createLogger();
const rootReducers = combineReducers({searchRobots, loadRobots});

const store = createStore(rootReducers, applyMiddleware(thunkMiddleware, logger));

ReactDOM.render(  // the props name need to be store
                <Provider store={store}> 
                    <App/>   
                </Provider>, document.getElementById('root'));

/// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
