'use strict';

var React = require('react-native');
var {
  AppRegistry,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} = React;

var FMPicker = require('react-native-fm-picker');

var TopMenu = require('./common/TopMenu.js');
var Page = require('./common/Page.js');

const BLENDS = {
  A : '95% English',
  B : 'mostly English',
  C : '50% each',
  D : 'mostly Spanish',
  E : '95% Spanish'
};

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
              en : 'test',
              es : 'prueba',
            },
            blends : {
              A : 'en',
              B : 'en',
              C : 'en',
              D : 'es',
              E : 'es'
            },
            style : {
              fontStyle : 'italic'
            }
          },
          {
            type : 'text',
            content : {
              en : 'number one',
              es : 'numero uno'
            },
            blends : {
              A : 'en',
              B : 'en',
              C : 'es',
              D : 'es',
              E : 'es'
            }
          },
          {
            type : 'text',
            content : {
              en : 'is done.',
              es : 'completo.'
            },
            blends : {
              A : 'en',
              B : 'es',
              C : 'es',
              D : 'es',
              E : 'es'
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
              en : 'Well, that\'s certainly good to know.',
              es : 'Bueno, eso es ciertamente bueno saberlo.'
            },
            blends : {
              A : 'en',
              B : 'en',
              C : 'en',
              D : 'es',
              E : 'es'
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
              en : 'I suggest you drop it, Mr. Data.',
              es : 'Sugiero se te cae, Sr. Data.'
            },
            blends : {
              A : 'en',
              B : 'en',
              C : 'en',
              D : 'es',
              E : 'es'
            }
          },
          {
            type : 'text',
            content : {
              en : 'Captain, why are we out here chasing comets? we should be doing something completely different',
              es : 'Capitán, ¿por qué estamos aquí persiguiendo cometas?'
            },
            blends : {
              A : 'en',
              B : 'en',
              C : 'en',
              D : 'es',
              E : 'es'
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
      blend : 'C'
    }
  },
  render : function() {
    return (
      <View style={[styles.container, this.border('yellow')]}>
        {this.renderTopMenu()}
        <View style={[styles.book, this.border('blue')]}>
          {this.prevPage()}
          <View style={[styles.content, this.border('black')]}>
            <Page page={PAGES[this.state.page - 1].content} blend={this.state.blend}></Page>
          </View>
          {this.nextPage()}
        </View>
        {this.renderBottomMenu()}
      </View>
    );
  },

  //PAGE NAVIGATION
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

  //BLEND SELECTION
  renderTopMenu : function() {
    return <View style={[styles.topMenu, styles.menu, this.border('green')]}>
      <View style={[styles.backButton, this.border('#444')]}>
        <Text>&lt;</Text>
      </View>
      <View style={[styles.bookTitle, this.border('#111')]}>
        <Text>Title</Text>
      </View>
      <View style={[styles.languageSelect, this.border('#aaa')]}>
       <Text>TBD</Text>
      </View>
    </View>
  },
  renderBottomMenu : function() {
    return <View style={[styles.bottomMenu, styles.menu, this.border('green')]}>
      <View style={[styles.languageSelect, this.border('#aaa')]}>
        <Text onPress={()=>{ this.refs.picker.show(); }}>
          {BLENDS[this.state.blend]}
        </Text>
      </View>
      <View style={[styles.currentPage, this.border('#111')]}>
        <Text>Page {this.state.page}</Text>
      </View>
      <View style={[styles.pagesLeft, this.border('#444')]}>
        <Text>{PAGES.length - this.state.page} Page Left</Text>
      </View>
      {this.renderBlendSelection()}
    </View>
  },
  getBlendLabels : function() {
    return Object.keys(BLENDS).map(function(key) {
      console.log(key, BLENDS[key], BLENDS);
        return BLENDS[key];
    });
  },
  getBlendOptions : function() {
    return Object.keys(BLENDS);
  },
  renderBlendSelection : function() {
    return (
      <FMPicker ref={'picker'}
        options={this.getBlendOptions()}
        labels={this.getBlendLabels()}
        onSubmit={this.setBlend}
      />
    );
  },
  setBlend : function(blend) {
    console.log(blend);
    this.setState({
      blend : blend
    });
  },

  //HELPER
  //TODO: remove
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
    alignItems : 'stretch',
    flexDirection : 'row',
  },
  topMenu : {
    flex : 1
  },
  bottomMenu : {
    flex : 1,
  },
  book : {
    flex : 18,
    flexDirection : 'row',
    alignItems : 'stretch'
  },
  content : {
    flex : 16
  },
  nextPage : {
    flex : 2
  },
  prevPage : {
    flex : 2
  },
  backButton : {
    flex : 3,
    alignItems : 'center',
    justifyContent : 'center'
  },
  bookTitle : {
    flex : 10,
    alignItems : 'center',
    justifyContent : 'center'
  },
  languageSelect : {
    flex : 5,
    alignItems : 'center',
    justifyContent : 'center'
  },
  currentPage : {
    flex : 10,
    alignItems : 'center',
    justifyContent : 'center'
  },
  pagesLeft : {
    flex : 5,
    alignItems : 'center',
    justifyContent : 'center'
  }
});

AppRegistry.registerComponent('blossom', () => blossom);
