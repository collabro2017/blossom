import React, { Component } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';

import PolliPicker from './Picker';
import styles from "./PolliStyles";

var Swiper = require('react-native-swiper');
import Icon from 'react-native-vector-icons/EvilIcons';

var Page = require('./Page.js');
var mixins = require('./Mixins');
var Toast = require('./Toast.js');

var Reader = React.createClass({
  displayName : 'Reader',
  
  getInitialState : function() {
    return {
      page : 1,
      blend : this.props.navigation.state.params.blend,
      contentWidth : Dimensions.get('window').width,
      contentHeight : Dimensions.get('window').height,
      statusBarShown : true,
      toastShown : false,
      toastData : null,
    }
  },
  updateBookSize : function(w, h) {
    this.setState({
      contentWidth : w,
      contentHeight : h
    });
  },
  componentDidMount : function(){
    //StatusBar.setHidden(true, 'slide');
    if(Platform.OS == 'android')
        StatusBar.setBackgroundColor('blue');
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
          mixins.styleOverride(global.currentBook),
          mixins.styleOverride(global.currentBook.pages[this.state.page-1]),
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
    return this.state.page == global.currentBook.pages.length;
  },
  getPages : function() {
    return global.currentBook.pages.map((page, index) => {
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
          <Text onPress={this.toggleStatusBar} style={styles.bookTitle}>{global.currentBook.title}</Text>
      </View>
      <View style={[styles.topMenuRight]}>
        <Text onPress={this.toggleStatusBar} style={styles.bookAuthor}>{global.currentBook.author}</Text>
      </View>
    </View>
  },
  renderBottomMenu : function() {
    return <View style={[styles.bottomMenu, styles.menu, this.border('green')]}>
      <View style={[styles.bottomMenuLeft]}>
        <PolliPicker blend={this.state.blend} onValueChange={(key)=>{this.setState({blend: key})}}/>
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

module.exports = Reader;
