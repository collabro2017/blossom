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
var Swiper = require('react-native-swiper')

var Page = require('./common/Page.js');

const BLENDS = {
  A : '95% English',
  B : 'mostly English',
  C : '50% each',
  D : 'mostly Spanish',
  E : '95% Spanish'
};

const BOOK = require('./common/Book.js');

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
            <Swiper
              style={[styles.content, this.border('black')]}
              showsButtons={true}
              loop={false}
              horizontal={true}
              index={this.state.page - 1}
              // nextButton={this.getNextButton}
              // prevButton={this.getPrevButton}
              onMomentumScrollEnd={this.setCurrentPage}
            >
              {this.getPages()}
            </Swiper>
        </View>
        {this.renderBottomMenu()}
      </View>
    );
  },
  getNextButton : function() {
    return <Text style={style.navigationButtons}>&gt;</Text>
  },
  getPrevButton : function() {
    return <Text style={style.navigationButtons}>&lt;</Text>
  },
  getPages : function() {
    return BOOK.pages.map((page, index) => {
      return <Page
        key={'p' + index}
        page={page.content}
        blend={this.state.blend}></Page>
    } );
  },
  setCurrentPage : function(e, swiper) {
    this.setState({
      page : swiper.index + 1
    });
  },

  //BLEND SELECTION
  renderTopMenu : function() {
    return <View style={[styles.topMenu, styles.menu, this.border('green')]}>
      <View style={[styles.backButton]}>
        <Text>&lt;</Text>
      </View>
      <View style={[styles.bookTitle]}>
        <Text>{BOOK.title}</Text>
        <Text>by {BOOK.author}</Text>
      </View>
      <View style={[styles.languageSelect]}>
       <Text></Text>
      </View>
    </View>
  },
  renderBottomMenu : function() {
    return <View style={[styles.bottomMenu, styles.menu, this.border('green')]}>
      <View style={[styles.languageSelect]}>
        <Text onPress={()=>{ this.refs.picker.show(); }}>
          {BLENDS[this.state.blend]}
        </Text>
      </View>
      <View style={[styles.currentPage]}>
        <Text>Page {this.state.page}</Text>
      </View>
      <View style={[styles.pagesLeft]}>
        <Text>{this.getPageLeftText()}</Text>
      </View>
      {this.renderBlendSelection()}
    </View>
  },
  getPageLeftText : function() {
    var numPagesLeft = BOOK.pages.length - this.state.page;
    if(numPagesLeft == 0) {
      return '';
    }
    if(numPagesLeft == 1) {
      return '1 Page Left';
    }

    return numPagesLeft + ' Pages Left';
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
    // return {
    //   borderWidth : 3,
    //   borderColor : color
    // }
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
    flex : 1,
  },
  },

  //top menu
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

  //bottom menu
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
