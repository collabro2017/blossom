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

const PAGES = [
  //first page
  {
    nodes : [
      {
        type : 'text',
        content : {
          'en' : 'test',
          'es' : 'prueba'
        }
      },
      {
        type : 'text',
        content : {
          'en' : 'number one',
          'es' : 'numero uno'
        }
      },
      {
        type : 'text',
        content : {
          'en' : 'is done',
          'es' : 'completo'
        }
      }
    ]
  },

  //2nd page
  {
    nodes : [
      {
        type : 'text',
        content : {
          'en' : 'Well, that\'s certainly good to know.',
          'es' : 'Bueno, eso es ciertamente bueno saberlo.'
        }
      },
      {
        type : 'text',
        content : {
          'en' : 'I suggest you drop it, Mr. Data.',
          'es' : 'Sugiero se te cae, Sr. Data.'
        }
      },
      {
        type : 'text',
        content : {
          'en' : 'Captain, why are we out here chasing comets?',
          'es' : 'Capitán, ¿por qué estamos aquí persiguiendo cometas?'
        }
      }
    ]
  }

];

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
