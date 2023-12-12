import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './component/reducers/index';
import App from './App';
import BookmarkedUsers from './component/BookmarkedUsers/BookmarkedUsers';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
    <BookmarkedUsers />
  </Provider>,
  document.getElementById('root')
);