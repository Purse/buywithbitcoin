import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';

import App from './app/App';

const proxyStore = new Store({portName: 'buywithbtc'});

const anchor = document.createElement('div');
anchor.id = 'rcr-anchor';
let found_placement = true;

/**
 * Tries to place the purse widget on the product page.
 */
if (document.getElementById('pmpux_feature_div') && document.getElementById('pmpux_feature_div').offsetWidth > 0) {
  document.getElementById('pmpux_feature_div').after(anchor);
} else if (document.getElementById('unifiedPrice_feature_div')) {
  document.getElementById('unifiedPrice_feature_div').after(anchor);
} else if (document.getElementById('tmmSwatches')) {
  document.getElementById('tmmSwatches').after(anchor);
} else if (document.getElementById('top')) {
  document.getElementById('top').after(anchor);
} else {
  console.log('Cannot find where to place purse widget on page.  aborting');
  found_placement = false;
}

proxyStore.ready().then(() => {
  if (found_placement) {
    render(<Provider store={proxyStore}><App/></Provider>, document.getElementById('rcr-anchor'));
  }
});
