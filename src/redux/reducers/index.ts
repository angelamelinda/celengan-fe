import { combineReducers } from 'redux';
import userReducer from './user';
import commonReducer from './common';
import categoryReducer from './category';
import budgetReducer from './budget';
import cashflowReducer from './cashflow';

const reducers = combineReducers({
    commonReducer,
    userReducer,
    categoryReducer,
    budgetReducer,
    cashflowReducer
});

export default reducers;
