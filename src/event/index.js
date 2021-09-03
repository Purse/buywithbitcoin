import { createStore, applyMiddleware } from 'redux';
import storeCreatorFactory from 'reduxed-chrome-storage';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import { wrapStore, alias } from 'react-chrome-redux';
import aliases from './aliases';

const options = {
  createStore: createStore,
};
const asyncStoreCreator = storeCreatorFactory(options);

asyncStoreCreator(rootReducer, applyMiddleware(alias(aliases), thunkMiddleware))
  .then((store) => {
    wrapStore(store, {
      portName: 'buywithbtc',
    });
  });
