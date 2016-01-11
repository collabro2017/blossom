'use strict';

var React = require('react-native');
var TopMenu = require('./common/TopMenu.js');
var BottomMenu = require('./common/BottomMenu.js');
var Book = require('./common/Book.js');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;



var blossom = React.createClass({
  render: function() {
    return (
      <View style={[styles.container, this.border('yellow')]}>
        <View style={[styles.topMenu, styles.menu, this.border('red')]}>
          <TopMenu> </TopMenu>
        </View>
        <View style={[styles.book, this.border('blue')]}>
          <Book></Book>
        </View>
        <View style={[styles.bottomMenu, styles.menu, this.border('green')]}>
          <BottomMenu></BottomMenu>
        </View>
      </View>
    );
  },
  border: function(color) {
    return {
      borderWidth : 3,
      borderColor : color
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex : 1,
    alignItems : 'stretch',
    justifyContent : 'center'
  },
  menu : {
    justifyContent : 'space-between',
    alignItems : 'center'
  },
  topMenu : {
    flex : 1
  },
  book : {
    flex: 18
  },
  bottomMenu : {
    flex : 1
  }
});

AppRegistry.registerComponent('blossom', () => blossom);
