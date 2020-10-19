import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import RootReducer from './reducers';

const Store = createStore(RootReducer, applyMiddleware(thunkMiddleware));

export default Store;