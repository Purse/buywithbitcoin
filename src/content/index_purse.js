import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';

import PurseApp from './app/PurseApp';

const proxyStore = new Store({portName: 'buywithbtc'});

const anchor = document.createElement('div');
anchor.id = 'rcr-anchor';
let found_placement = true;

if (document.getElementById('price')) {
  document.getElementById('price').after(anchor);
} else if (document.getElementById('top')) {
  document.getElementById('top').after(anchor);
} else {
  console.log('Cannot find where to place purse widget on page.  aborting');
  found_placement = false;
}

if (found_placement) {
  proxyStore.ready().then(() => {
    render(
      <Provider store={proxyStore}>
        <PurseApp/>
      </Provider>
    , document.getElementById('rcr-anchor'));
  });
}
