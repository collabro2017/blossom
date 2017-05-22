import React, { Component } from 'react';
import {
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Text,
  AppRegistry,
  View,
} from 'react-native';

var BackboneEvents = require('backbone-events-standalone');
// global event bus
window.EventBus = BackboneEvents.mixin({});

global.currentBook = null;

import { StackNavigator } from 'react-navigation';

import Reader from './Reader';
import FrontPage from './FrontPage';
import Bookstore from './Bookstore';
import BookDetail from './BookDetail';
import BookLibraryDetail from './BookLibraryDetail';
import UserSettings from './UserSettings';
import LoginPage from './LoginPage';
import { OBWFirst, OBWSecond, OBWThird } from './UserOnboarding';

if (global.user){
  var initialRoute = 'FrontPage';
}else{
  var initialRoute = 'LoginPage';
}

const AppContainer = StackNavigator(
  {
    LoginPage: {screen: LoginPage},
    FrontPage: {screen: FrontPage, navigationOptions: ({navigation}) => ({
      headerBackTitle: null,
    }) },
    Reader: {screen: Reader },
    Library: {screen: Bookstore},
    BookDetail: {screen: BookDetail},
    BookLibraryDetail: {screen: BookLibraryDetail},
    UserSettings: {screen: UserSettings},
    // Onboarding wizard screens:
    OBWFirst: {screen: OBWFirst},
    OBWSecond: {screen: OBWSecond},
    OBWThird: {screen: OBWThird},

  },
  {
    headerMode: 'screen',
    initialRouteName: initialRoute,
  }
);

export default AppContainer;
