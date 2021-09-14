import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'webext-redux';

import ProductApp from './app/ProductApp';
import TrackingApp from './app/TrackingApp';
import OrderHistoryApp from './app/OrderHistoryApp';

const proxyStore = new Store({portName: 'buywithbtc'});

const anchor = document.createElement('div');
anchor.id = 'rcr-anchor';
let pageType = 'product';

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
} else if (document.getElementById('primaryStatus') && location.href.match(/progress-tracker/)) {
  // Is Tracking Page
  pageType = 'tracking';
  document.getElementById('primaryStatus').after(anchor);
} else if (document.getElementById('ordersContainer') && location.href.match(/order-history/)) {
  // Is Order History
  pageType = 'orderHistory',
  document.getElementById('ordersContainer').before(anchor);
} else {
  console.log('Cannot find where to place purse widget on page.  aborting');
  pageType = false;
}

proxyStore.ready().then(() => {
  switch (pageType) {
    case 'product':
      render(
        <Provider store={proxyStore}>
          <ProductApp />
        </Provider>,
        document.getElementById('rcr-anchor')
      );
      break;
    case 'tracking':
      render(
        <Provider store={proxyStore}>
          <TrackingApp />
        </Provider>,
        document.getElementById('rcr-anchor')
      );
      break;
    case 'orderHistory':
      render(
        <Provider store={proxyStore}>
          <OrderHistoryApp />
        </Provider>,
        document.getElementById('rcr-anchor')
      );
      break;
    default:
      break;
  }
});
