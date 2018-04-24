import {createStore} from 'redux';
import rootReducer from './reducers';

import {wrapStore} from 'react-chrome-redux';

const store = createStore(rootReducer, {});
// var rule1 = {
//   conditions: [
//     new chrome.declarativeContent.PageStateMatcher({
//       pageUrl: { hostEquals: 'www.amazon.com', schemes: ['https'] }
//     })
//   ],
//   actions: [ new chrome.declarativeContent.ShowPageAction() ]
// };
// chrome.runtime.onInstalled.addListener(() => {
//   alert('I was installedered');
// });
wrapStore(store, {
  portName: 'example'
});

// alert(JSON.stringify(chrome))
// chrome.runtime.onInstalled.addListener(function(details) {
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     chrome.declarativeContent.onPageChanged.addRules([rule1]);
//   });
// });

// chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//   alert('booooooo')
//   // With a new rule ...
// });
// chrome.runtime.onInstalled.addListener(function() {
//   alert(JSON.stringify(chrome))
//   // Replace all rules ...
// });

// chrome.declarativeContent.onPageChanged.addRules([
//   {
//     // That fires when a page's URL contains a 'g' ...
//     conditions: [
//       new chrome.declarativeContent.PageStateMatcher({
//         pageUrl: { urlContains: 'a' },
//       })
//     ],
//     // And shows the extension's page action.
//     actions: [ new chrome.declarativeContent.ShowPageAction() ]
//   }
// ], function () {
//   alert('aasdfasdfasdf');
// });