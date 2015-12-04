/**
 * Blossom
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var TopMenu = require('./common/TopMenu.js');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var blossom = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <TopMenu></TopMenu>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    position: "absolute",
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('blossom', () => blossom);
