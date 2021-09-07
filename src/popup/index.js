import React from 'react';
import {render} from 'react-dom';

import App from './app/App';

import {Store} from 'webext-redux';
import {Provider} from 'react-redux';

const proxyStore = new Store({
  portName: 'buywithbtc'
});

proxyStore.ready().then(() => {
  render(
     <Provider store={proxyStore}><App /></Provider>
    ,document.getElementById('app'));
});
