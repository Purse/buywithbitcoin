import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';

import App from './app/App';

const proxyStore = new Store({portName: 'buywithbtc'});

const anchor = document.createElement('div');
anchor.id = 'rcr-anchor';
if (document.getElementById('pmpux_feature_div') && document.getElementById('pmpux_feature_div').offsetWidth > 0) {
  document.getElementById('pmpux_feature_div').after(anchor);
} else if (document.getElementById('unifiedPrice_feature_div')) {
  document.getElementById('unifiedPrice_feature_div').after(anchor);
} else if (document.getElementById('tmmSwatches')) {
  document.getElementById('tmmSwatches').after(anchor);
} else {
  document.getElementById('top').after(anchor);
}

proxyStore.ready().then(() => {
  render(<Provider store={proxyStore}><App/></Provider>, document.getElementById('rcr-anchor'));
});
