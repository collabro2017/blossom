import React, { Component } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  StatusBar,
  LayoutAnimation,
  Platform,
  TouchableWithoutFeedback,
  UIManager,
} from 'react-native';

import PolliPicker from './PolliPicker';
import styles, {colors} from "./PolliStyles";
import PhysicalBook from './PhysicalBook'

import Device from 'react-native-device-detection';

import RNFetchBlob from 'react-native-fetch-blob';

const BOOKS_PER_ROW = Device.isTablet? 4 : 2;
const BOOKS_TO_RENDER = 3;
const BOOK = require('./Book.js');
const BOOK_CHINESE = require('./Poem-chinese.js');

var Swiper = require('react-native-swiper');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

var Page = require('./Page.js');
var mixins = require('./Mixins');

import TimerMixin from 'react-timer-mixin';

import LocalLibraryDAO from './LocalLibraryDAO.js';
var LocalLibrary = new LocalLibraryDAO();

const blendLevelIndexes = [
    "A",
    "B",
    "C",
    "D",
    "E"
];

const blendLevelKeyByIndex = [];
for(var i=0; i<blendLevelIndexes.length; i++) {
    blendLevelKeyByIndex[blendLevelIndexes[i]] = i;
}

var Reader = React.createClass({
  displayName : 'Reader',
  mixins: [TimerMixin],
  getInitialState : function() {
    /*var page = this.props.navigation.state.params.earmarkedPage
          ? this.props.navigation.state.params.earmarkedPage
          : 1;
          */

    var page = 1;
    // Enable LayoutAnimation under Android
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    return {
      page : page,
      continuedBar: false,
      blend : 'A',
      contentWidth : Dimensions.get('window').width,
      contentHeight : Dimensions.get('window').height,
      statusBarShown : true,
      showControls: true,
      bookLoaded: false,
    }
  },
  updateBookSize : function(w, h) {
    this.setState({
      contentWidth : w,
      contentHeight : h
    });
  },
  addSettingsToGrid(dataSourceArray) {
      for(var i=0; i <= BOOKS_PER_ROW - dataSourceArray.length; i++) {
          dataSourceArray.push({"type" : "invisibleBook", "key" : `invisibleBook_${i}`})
      }

      console.log("BOOKS_PER_ROW", dataSourceArray);

      dataSourceArray.push({"type" : "settings"});

      this.setState ({
        dataSource: dataSourceArray,
      });
  },
  loadDefaultBook() {
      var dataSourceArray = [BOOK, BOOK_CHINESE];
      this.loadBook(BOOK);

  },
  loadBook(book) {
      if (book.author){
        global.currentBook=book;
        LocalLibrary.get(global.currentBook.bookId, this.updateThenDisplayBook.bind(this));
      }
  },
  updateThenDisplayBook(statsArray) {
      const { navigate } = this.props.navigation;
      var stats = statsArray[0] || {};
      console.log('stats for book ID ' + global.currentBook.bookId, stats);

      var navigationProps = {};
      navigate.blend = PhysicalBook.blendLevelIndexes[stats.blendLevel] || 'A';
      navigate.earmarkedPage = stats.earmarkedPage || 1;

      this.setState({
        bookLoaded : true
      });

  },
  componentDidMount : function(){
    //StatusBar.setHidden(true, 'slide');
    if(Platform.OS == 'android')
        StatusBar.setBackgroundColor('blue');

    if (global.currentBook == null) {
      this.setState({
        bookLoaded : false
      });
      this.loadDefaultBook();
    }

    this.setTimeout(() => {this.hideNotification()}, 5000);
  },
  componentWillUnmount : function(){
      console.log(`unmount ${global.currentBook.bookId}`, this.state.page, global.currentBook.path);
      global.currentBook.earmarkedPage = this.state.page;
      if(this.isLastPage()) {
          global.currentBook.readCount += 1;
          global.currentBook.earmarkedPage = 1;
      }
      //console.log(`page after update: ${global.currentBook.earmarkedPage}`)
      LocalLibrary.update(global.currentBook);
  },
  layoutChange : function(e) {
    this.updateBookSize(e.nativeEvent.layout.width, e.nativeEvent.layout.height);
  },
  render : function() {

    if (this.state.bookLoaded == false) {

        return (
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Text> Loading... </Text>
          </View>
        );
    }

      console.ignoredYellowBox = ['\`setBackgroundColor\`'];

      var nextButton = <Icon name="chevron-right" size={30} color={colors.quaternaryDark} ></Icon>;
      var prevButton = <Icon name="chevron-left" size={30} color={colors.quaternaryDark} ></Icon>;

    return (
      <View
        style={[
          styles.container,
          this.border('yellow'),
          mixins.styleOverride(global.currentBook),
          mixins.styleOverride(global.currentBook.pages[this.state.page-1]),
        ]}>
        {this.renderNotificationBar()}
        {this.renderTopMenu()}
        {this.renderFakeTopMenu()}
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
                showsButtons={this.state.showControls}
                nextButton={nextButton}
                prevButton={prevButton}
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
      if(!this.state.showControls)
        return <View />;

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
      if(!this.state.showControls)
      return <View />;

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
    if(this.isLastPage()) {
      return;
    }

    this.setState({
      page : this.state.page + 1
    });
  },
  handlePrevPage : function() {
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
    return this.state.page == global.currentBook.pages.length;
  },
  getPages : function() {
    return global.currentBook.pages.map((page, index) => {
      return <Page
        key={'p' + index}
        page={page.content}
        blend={this.state.blend}
      ></Page>
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
  updateBlendLevel(level, levelIndex) {
      global.currentBook.blendLevel = level;
      LocalLibrary.update(global.currentBook);
      this.setState({blend:levelIndex});
  },
  hideNotification : function() {
      LayoutAnimation.easeInEaseOut();
      this.setState({continuedBar : false});
  },
  toggleControls : function() {
      LayoutAnimation.easeInEaseOut();
      this.setState({showControls : !this.state.showControls});
  },
  renderNotificationBar : function() {
      if(!this.state.continuedBar)
        return null;
      if (Platform.OS === 'android') {
        var dismissButton = <Icon
          name="close"
          onPress={() => this.hideNotification() }
          color={colors.textOnPrimary}
          size={30}
        />;
      }else{
        var dismissButton = <Button
          onPress={() => this.hideNotification() }
          title="Dismiss"
          color={colors.textOnPrimary}
          accessibilityLabel="Dismiss"
        />
      }
      return <View style={[styles.userbar, styles.backgroundTertiary, styles.notificationBar]}>
          <Icon name="bookmark" size={26} color={colors.textOnSecondary} />
          <Text style={styles.dismissableNotificationText}>This is where you last left off</Text>
          {dismissButton}
      </View>
  },
  renderFakeTopMenu : function() {
      return <TouchableWithoutFeedback onPress={() => this.toggleControls()} >
          <View style={[styles.topMenu, styles.fakeTopMenu]} />
      </TouchableWithoutFeedback>
  },
  renderTopMenu : function() {
      if(!this.state.showControls)
        return <View />

    return <View
        style={[styles.topMenu, styles.menu, this.border('green')]}>
      <View style={[styles.topMenuLeft]}>
        <Text></Text>
      </View>
      <View style={[styles.topMenuCenter]}>
          <Text onPress={() => this.toggleControls()} style={styles.topMenuCenterText}>{global.currentBook.title}</Text>
      </View>
      <View style={[styles.topMenuRight]}>
        {/*<Text onPress={this.toggleStatusBar} style={styles.topMenuRightText}>{global.currentBook.author}</Text>*/}
      </View>
    </View>
  },
  renderBottomMenu : function() {
      if(!this.state.showControls)
        return <View />;

    return <View style={[styles.bottomMenu, styles.menu, this.border('green')]}>
      <View style={[styles.bottomMenuLeft]}>
        <PolliPicker style={styles.bottomMenuLabels} blend={this.state.blend} onValueChange={(key)=>{this.updateBlendLevel(blendLevelKeyByIndex[key], key)}}/>
      </View>
      <View style={[styles.bottomMenuCenter]}>
        <Text style={styles.bottomMenuLabels}>Page {this.state.page}</Text>
      </View>
      <View style={[styles.bottomMenuRight]}>
        <Text style={styles.bottomMenuLabels}>{this.getPageLeftText()}</Text>
      </View>
    </View>
  },
  getPageLeftText : function() {
    var numPagesLeft = global.currentBook.pages.length - this.state.page;
    if(numPagesLeft == 0) {
      return '';
    }
    if(numPagesLeft == 1) {
      return '1 Page Left';
    }

    return numPagesLeft + ' Pages Left';
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

Reader.navigationOptions = props => {
  return {
      title: 'Blossom',
    }
}

module.exports = Reader;
