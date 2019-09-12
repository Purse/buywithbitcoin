import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';

import PurseApp from './app/PurseApp';

const proxyStore = new Store({portName: 'buywithbtc'});

const anchor = document.createElement('div');
anchor.id = 'rcr-anchor';
if (document.getElementById('price')) {
  document.getElementById('price').after(anchor);
} else {
  document.getElementById('top').after(anchor);
}


proxyStore.ready().then(() => {
  render(
    <Provider store={proxyStore}>
      <PurseApp/>
    </Provider>
   , document.getElementById('rcr-anchor'));
});
