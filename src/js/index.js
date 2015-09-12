//require("babel/polyfill");
import React from 'react';
import AppRouter from './containers/AppRouter';
let injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

React.render(
  <AppRouter />,
  document.getElementById('header')
);
