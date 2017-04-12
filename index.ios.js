import React, { Component } from 'react';
import {
  AppRegistry, View,
} from 'react-native';
import AppContainer from './common/AppContainer';

export default class blossom extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
};

AppRegistry.registerComponent('blossom', () => blossom);
