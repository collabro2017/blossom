import React, { Component } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import FitImage from 'react-native-fit-image';

var PolliBookFetch = require('./polli-book-fetch.js');

const fetcher = new PolliBookFetch();

const TITLE_FONT_SIZE = /*Device.isIpad() ? 20 :*/ 14;
const AUTHOR_FONT_SIZE = /*Device.isIpad() ? 15 :*/ 9;
const BOTTOM_FONT_SIZE = /*Device.isIpad() ? 13 :*/ 11;

export default class DownloadableBook extends React.Component {

    showReader(book) {
        const { navigate } = this.props.navigation;
        console.log('future book is:');
        console.log(book.title);
        global.currentBook = book;
        navigate('Reader');
    }

    fetchDone(book) {
        //var book = require(bookJsonPath);
        this.showReader(book);

    }

    downloadBook(bookDescriptor) {
        fetcher.fetchBook(bookDescriptor.bookId, this.showReader, this);

        //this.showReader(book);
    }

    render() {
      const { navigate } = this.props.navigation;

      return (
        <TouchableHighlight onPress={() => this.downloadBook(this.props.book)} style={styles.physicalBook} >
        <View>
          <FitImage
            source={{uri: this.props.book.thumbnail}}
            style={styles.thumbnail}
          />
          <View >
            <Text
            style={styles.bookTitle}
            numberOfLines={3}>{this.props.book.title}</Text>
            <Text style={styles.bookAuthor}>{this.props.book.author}</Text>
          </View>
        </View>
        </TouchableHighlight>
      );
  }
}

var controlsColor = '#583919';
var styles = StyleSheet.create({
  physicalBook : {
      margin: 12,
      padding: 5,
      backgroundColor: '#fff',
      borderRadius: 3,
      shadowColor: "#000000",
      shadowOpacity: 0.6,
      shadowRadius: 2,
      shadowOffset: {
          height: 0,
          width: 0
        }
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
});
