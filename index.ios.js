'use strict';

var React = require('react-native');
var TopMenu = require('./common/TopMenu.js');
var BottomMenu = require('./common/BottomMenu.js');
var Page = require('./common/Page.js');

var {
  AppRegistry,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} = React;

const PAGES = [
  //first page
  {
    content : [
      {
        type : 'paragraph',
        content : [
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
      }
    ]
  },

  //2nd page
  {
    content : [
      {
        type : 'paragraph',
        content : [
          {
            type : 'text',
            content : {
              'en' : 'Well, that\'s certainly good to know.',
              'es' : 'Bueno, eso es ciertamente bueno saberlo.'
            }
          }
        ]
      },
      {
        type : 'paragraph',
        content : [
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
              'en' : 'Captain, why are we out here chasing comets? we should be doing something completely different',
              'es' : 'Capitán, ¿por qué estamos aquí persiguiendo cometas?'
            }
          }
        ]
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
            <Page page={PAGES[this.state.page - 1].content}></Page>
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
    return <TouchableHighlight
      underlayColor="rgba(0,0,0,0.2)"
      onPress={this.handleNextPage}
      style={[styles.nextPage, this.border('orange')]}>
        <Text>next</Text>
      </TouchableHighlight>
  },
  prevPage : function() {
    return <TouchableHighlight
      underlayColor="rgba(0,0,0,0.2)"
      onPress={this.handlePrevPage}
      style={[styles.prevPage, this.border('pink')]}>
        <Text>prev</Text>
      </TouchableHighlight>
  },
  handleNextPage : function() {
    if(this.state.page == PAGES.length)
    {
      return false;
    }

    this.setState({
      page : this.state.page + 1
    })
  },
  handlePrevPage : function() {
    if(this.state.page == 1)
    {
      return false;
    }

    this.setState({
      page : this.state.page - 1
    })
  },
  border : function(color) {
    return {
      // borderWidth : 3,
      // borderColor : color
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
