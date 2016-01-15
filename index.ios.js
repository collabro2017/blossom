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
          {this.prevPage()}
          <View style={[styles.content, this.border('black')]}>
            <Page page={BOOK.pages[this.state.page - 1].content} blend={this.state.blend}></Page>
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
    if(this.state.page == BOOKS.pages.length)
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
       <Text></Text>
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
