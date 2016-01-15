'use strict';

var React = require('react-native');
var {
  AppRegistry,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBarIOS
} = React;

var FMPicker = require('react-native-fm-picker');
var Swiper = require('react-native-swiper');
var Icon = require('react-native-vector-icons/EvilIcons');

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
      blend : 'C',
      contentWidth : Dimensions.get('window').width,
      contentHeight : Dimensions.get('window').height,
      statusBarShown : true
    }
  },
  updateBookSize : function(w, h) {
    this.setState({
      contentWidth : w,
      contentHeight : h
    });
  },
  componentDidMount : function(){
    StatusBarIOS.setHidden(true, 'slide');
  },
  layoutChange : function(e) {
    this.updateBookSize(e.nativeEvent.layout.width, e.nativeEvent.layout.height);
  },
  render : function() {
    return (
      <View style={[styles.container, this.border('yellow')]}>
        {this.renderTopMenu()}
        <View
          style={[styles.book, this.border('blue')]}
          onLayout={this.layoutChange}
          ref="contentWrapper">
            <Swiper
              style={[styles.content, this.border('black')]}
              showsButtons={true}
              showsPagination={false}
              loop={false}
              horizontal={true}
              index={this.state.page - 1}
              nextButton={this.getNextButton()}
              prevButton={this.getPrevButton()}
              onMomentumScrollEnd={this.setCurrentPage}
              width={this.state.contentWidth}
              height={this.state.contentHeight}
            >
              {this.getPages()}
            </Swiper>
        </View>
        {this.renderBottomMenu()}
      </View>
    );
  },
  getNextButton : function() {
    return <Icon name="arrow-right" size={60} color="#BBB391" />
  },
  getPrevButton : function() {
    return <Icon name="arrow-left" size={60} color="#BBB391" />
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

  toggleStatusBar : function() {
    var show = !this.state.statusBarShown;
    console.log(show);
    StatusBarIOS.setHidden(show, 'slide');
    this.setState({
      statusBarShown : show
    });
  },

  renderTopMenu : function() {
    return <View 
        style={[styles.topMenu, styles.menu, this.border('green')]}>
      <View style={[styles.backButton]}>
        <Text></Text>
      </View>
      <View style={[styles.bookHeader]}>
          <Text onPress={this.toggleStatusBar} style={styles.bookTitle}>{BOOK.title}</Text>
          <Text onPress={this.toggleStatusBar} style={styles.bookAuthor}>{BOOK.author}</Text>
      </View>
      <View style={[styles.languageSelect]}>
       <Text></Text>
      </View>
    </View>
  },
  renderBottomMenu : function() {
    return <View style={[styles.bottomMenu, styles.menu, this.border('green')]}>
      <View style={[styles.languageSelect]}>
        <Text style={styles.bottomMenuLabels} onPress={()=>{ this.refs.picker.show(); }}>
          {BLENDS[this.state.blend]}
        </Text>
      </View>
      <View style={[styles.currentPage]}>
        <Text style={styles.bottomMenuLabels}>Page {this.state.page}</Text>
      </View>
      <View style={[styles.pagesLeft]}>
        <Text style={styles.bottomMenuLabels}>{this.getPageLeftText()}</Text>
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


var controlsColor = '#583919';
var styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : 'stretch',
    justifyContent : 'center',
    backgroundColor: '#F5F2DE'
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
  navigationButton : {
    color: controlsColor,
    fontSize : 40,
    fontWeight : 'bold'
  },

  //top menu
  backButton : {
    flex : 3,
    alignItems : 'center',
    justifyContent : 'center'
  },
  bookHeader : {
    flex : 10,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
    paddingTop: 20
  },
  bookTitle : {
    fontFamily : 'Open Sans',
    color : controlsColor,
    fontSize : 20
  },
  bookAuthor : {
    fontFamily : 'Open Sans',
    color : controlsColor,
    paddingLeft: 10,
    fontSize : 15,
    fontWeight : '600'
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
  },
  bottomMenuLabels : {
    fontFamily : 'Open Sans',
    color : controlsColor,
  }
});

AppRegistry.registerComponent('blossom', () => blossom);
