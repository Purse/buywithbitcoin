import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import { wrapStore, alias } from 'webext-redux';
import aliases from './aliases';

const store = createStore(
  rootReducer,
  applyMiddleware(
    alias(aliases),
    thunkMiddleware
  )
);

wrapStore(store, {
  portName: 'buywithbtc'
});
