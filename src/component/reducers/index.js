import { combineReducers } from 'redux';
import usersReducer from '../reducers/UserReducers';

const rootReducer = combineReducers({
  users: usersReducer,
});

export default rootReducer;