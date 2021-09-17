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
const trackingAnchor =
  document.getElementById('primaryStatus') || // v1
  document.querySelector('.pt-promise-details-slot') || //v2
  document.getElementById('promise-card-asin-image-carousel'); //v2 alternate

if (document.getElementById('pmpux_feature_div') && document.getElementById('pmpux_feature_div').offsetWidth > 0) {
  document.getElementById('pmpux_feature_div').after(anchor);
} else if (document.getElementById('unifiedPrice_feature_div')) {
  document.getElementById('unifiedPrice_feature_div').after(anchor);
} else if (document.getElementById('tmmSwatches')) {
  document.getElementById('tmmSwatches').after(anchor);
} else if (document.getElementById('top')) {
  document.getElementById('top').after(anchor);
} else if (trackingAnchor && location.href.match(/progress-tracker/)) {
  // Is Tracking Page
  pageType = 'tracking';
  trackingAnchor.after(anchor);
} else if (document.getElementById('ordersContainer') && location.href.match(/order-history/)) {
  // Is Order History
  pageType = 'orderHistory',
  document.getElementById('ordersContainer').before(anchor);
} else {
  console.log('Cannot find where to place purse widget on page.  aborting');
  pageType = false;
}

chrome.storage.sync.get({
  shopperFeatures: true,
  earnerFeatures: true
}, function(items) {
  proxyStore.ready().then(() => {
    switch (pageType) {
      case 'product': {
        items.shopperFeatures && render(
          <Provider store={proxyStore}>
            <ProductApp />
          </Provider>,
          document.getElementById('rcr-anchor')
        );
        break;
      }
      case 'tracking': {
        items.earnerFeatures && render(
          <Provider store={proxyStore}>
            <TrackingApp />
          </Provider>,
          document.getElementById('rcr-anchor')
        );
        break;
      }
      case 'orderHistory': {
        items.earnerFeatures && render(
          <Provider store={proxyStore}>
            <OrderHistoryApp />
          </Provider>,
          document.getElementById('rcr-anchor')
        );
        break;
      }
      default:
        break;
    }
  });
});
