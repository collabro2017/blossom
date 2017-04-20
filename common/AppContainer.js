import React, { Component } from 'react';
import {
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import LocalLibraryDAO from './LocalLibraryDAO.js';

var LocalLibrary = new LocalLibraryDAO();

var BackboneEvents = require('backbone-events-standalone');
// global event bus
window.EventBus = BackboneEvents.mixin({});

global.currentBook = null;

import { StackNavigator } from 'react-navigation';

import Reader from './Reader';
import FrontPage from './FrontPage';
import Bookstore from './Bookstore';
import BookDetail from './BookDetail';

const AppContainer = StackNavigator({
  Main: {screen: FrontPage},
  Reader: {screen: Reader},
  Library: {screen: Bookstore},
  BookDetail: {screen: BookDetail}
});

export default AppContainer;
