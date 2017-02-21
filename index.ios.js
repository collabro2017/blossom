'use strict';

var React = require('react-native');
const {
  AppRegistry,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar
} = React;

var Device = require('react-native-device');

const TITLE_FONT_SIZE = Device.isIpad() ? 20 : 14;
const AUTHOR_FONT_SIZE = Device.isIpad() ? 15 : 9;
const BOTTOM_FONT_SIZE = Device.isIpad() ? 13 : 11;

var FMPicker = require('react-native-fm-picker');
var Swiper = require('react-native-swiper');
var Icon = require('react-native-vector-icons/EvilIcons');

var Page = require('./common/Page.js');
var mixins = require('./common/Mixins.js');
var Toast = require('./common/Toast.js');

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
      blend : 'A',
      contentWidth : Dimensions.get('window').width,
      contentHeight : Dimensions.get('window').height,
      statusBarShown : true,
      toastShown : false,
      toastData : null
    }
  },
  updateBookSize : function(w, h) {
    this.setState({
      contentWidth : w,
      contentHeight : h
    });
  },
  componentDidMount : function(){
    StatusBar.setHidden(true, 'slide');
  },
  layoutChange : function(e) {
    this.updateBookSize(e.nativeEvent.layout.width, e.nativeEvent.layout.height);
  },
  hideToast() {
    this.setState({
      toastShown: false,
      toastData: null,
    });
  },
  showToast(L1, L2, currentLang) {
    this.setState({
      toastShown: true,
      toastData: {
        L1: L1,
        L2: L2,
        currentLang: currentLang,
      }
    });
  },
  render : function() {
    return (
      <View
        style={[
          styles.container,
          this.border('yellow'),
          mixins.styleOverride(BOOK),
          mixins.styleOverride(BOOK.pages[this.state.page-1]),
        ]}>
        <Toast
          isVisible={this.state.toastShown}
          onDismiss={this.hideToast}
          position="bottom"
          node={this.state.toastData}
        />
        {this.renderTopMenu()}
        <View style={styles.book}>
          <View
            style={[styles.content, this.border('blue')]}
            onLayout={this.layoutChange}
            ref="contentWrapper">
              <Swiper
                style={[styles.pages, this.border('black')]}
                showsPagination={false}
                loop={false}
                horizontal={true}
                index={this.state.page - 1}
                showsButtons={true}
                onMomentumScrollEnd={this.setCurrentPage}
                width={this.state.contentWidth}
                height={this.state.contentHeight}
              >
                {this.getPages()}
              </Swiper>
          </View>
        </View>
        {this.renderBottomMenu()}
      </View>
    );
  },
  nextPage : function() {
    var color = '#BBB391';
    if(this.isLastPage())
    {
      color = "rgba(0,0,0,0)";
    }
    return <TouchableHighlight
      underlayColor="rgba(0,0,0,0.2)"
      onPress={this.handleNextPage}
      style={[styles.nextPage, this.border('orange')]}>
        <Icon name="arrow-right" size={50} color={color} />
      </TouchableHighlight>
  },
  prevPage : function() {
    var color = '#BBB391';
    if(this.isFirstPage())
    {
      color = "rgba(0,0,0,0)";
    }
    return <TouchableHighlight
      underlayColor="rgba(0,0,0,0.2)"
      onPress={this.handlePrevPage}
      style={[styles.prevPage, this.border('pink')]}>
        <Icon name="arrow-left" size={50} color={color} />
      </TouchableHighlight>
  },
  handleNextPage : function() {
    this.hideToast()
    if(this.isLastPage()) {
      return;
    }

    this.setState({
      page : this.state.page + 1
    })
  },
  handlePrevPage : function() {
    this.hideToast()
    if(this.isFirstPage()) {
      return;
    }

    this.setState({
      page : this.state.page - 1
    })
  },
  isFirstPage : function() {
    return this.state.page == 1;
  },
  isLastPage : function() {
    return this.state.page == BOOK.pages.length;
  },
  getPages : function() {
    return BOOK.pages.map((page, index) => {
      return <Page
        key={'p' + index}
        page={page.content}
        blend={this.state.blend}
        onToast={this.showToast}></Page>
    } );
  },
  setCurrentPage : function(e, swiper) {
    this.setState({
      page : swiper.index + 1
    });
  },

  toggleStatusBar : function() {
    var show = !this.state.statusBarShown;
    StatusBar.setHidden(show, 'slide');
    this.setState({
      statusBarShown : show
    });
  },

  renderTopMenu : function() {
    return <View
        style={[styles.topMenu, styles.menu, this.border('green')]}>
      <View style={[styles.topMenuLeft]}>
        <Text></Text>
      </View>
      <View style={[styles.topMenuCenter]}>
          <Text onPress={this.toggleStatusBar} style={styles.bookTitle}>{BOOK.title}</Text>
      </View>
      <View style={[styles.topMenuRight]}>
        <Text onPress={this.toggleStatusBar} style={styles.bookAuthor}>{BOOK.author}</Text>
      </View>
    </View>
  },
  renderBottomMenu : function() {
    return <View style={[styles.bottomMenu, styles.menu, this.border('green')]}>
      <View style={[styles.bottomMenuLeft]}>
        <Text style={styles.bottomMenuLabels} onPress={()=>{ this.refs.picker.show(); }}>
          {BLENDS[this.state.blend]}
        </Text>
      </View>
      <View style={[styles.bottomMenuCenter]}>
        <Text style={styles.bottomMenuLabels}>Page {this.state.page}</Text>
      </View>
      <View style={[styles.bottomMenuRight]}>
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
    flex : 16,
  },
  nextPage : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center'
  },
  prevPage : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center'
  },
  page : {
    flex : 1
  },

  //top menu
  topMenuLeft : {
    flex : 3,
    alignItems : 'center',
    justifyContent : 'center'
  },
  topMenuCenter : {
    flex : 10,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
    paddingTop: 20
  },
  topMenuRight : {
    flex : 3,
    alignItems : 'center',
    justifyContent : 'center',
    paddingTop: 20
  },
  bookTitle : {
    fontFamily : 'Open Sans',
    color : controlsColor,
    fontSize : TITLE_FONT_SIZE
  },
  bookAuthor : {
    fontFamily : 'Open Sans',
    color : controlsColor,
    fontSize : AUTHOR_FONT_SIZE,
    fontWeight : '600'
  },


  //bottom menu
  bottomMenuLeft : {
    flex : 5,
    alignItems : 'center',
    justifyContent : 'center'
  },
  bottomMenuCenter : {
    flex : 10,
    alignItems : 'center',
    justifyContent : 'center'
  },
  bottomMenuRight : {
    flex : 5,
    alignItems : 'center',
    justifyContent : 'center'
  },
  bottomMenuLabels : {
    fontFamily : 'Open Sans',
    fontSize: BOTTOM_FONT_SIZE,
    color : controlsColor,
  },
});

AppRegistry.registerComponent('blossom', () => blossom);
