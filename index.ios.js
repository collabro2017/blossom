'use strict';

var React = require('react-native');
var TopMenu = require('./common/TopMenu.js');
var BottomMenu = require('./common/BottomMenu.js');
var Page = require('./common/Page.js');

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
  getInitialState : function() {
    return {
      page : 1,
      languageMix : 'A'
    }
  },
  render : function() {
    return (
      <View style={[styles.container, this.border('yellow')]}>
        <View style={[styles.topMenu, styles.menu, this.border('red')]}>
          <TopMenu> </TopMenu>
        </View>
        <View style={[styles.book, this.border('blue')]}>
          {this.prevPage()}
          <View style={[styles.content, this.border('black')]}>
            <Page content={PAGES[this.state.page - 1]}></Page>
          </View>
          {this.nextPage()}
        </View>
        <View style={[styles.bottomMenu, styles.menu, this.border('green')]}>
          <BottomMenu></BottomMenu>
        </View>
      </View>
    );
  },
  nextPage : function() {
    return <View style={[styles.nextPage, this.border('orange')]}>
        <Text>next</Text>
      </View>
  },
  prevPage : function() {
    return <View style={[styles.prevPage, this.border('pink')]}>
        <Text>prev</Text>
      </View>
  },
  border : function(color) {
    return {
      borderWidth : 3,
      borderColor : color
    }
  }
});

var styles = StyleSheet.create({
  container : {
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
    flex : 18,
    flexDirection : 'row',
    alignItems : 'stretch'
  },
  bottomMenu : {
    flex : 1
  },
  content : {
    flex : 16
  },
  nextPage : {
    flex : 2
  },
  prevPage : {
    flex : 2
  }
});

AppRegistry.registerComponent('blossom', () => blossom);
