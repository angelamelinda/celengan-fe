import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger'

import RootReducer from './reducers';

const Store = createStore(RootReducer, applyMiddleware(thunkMiddleware, logger));

export default Store;