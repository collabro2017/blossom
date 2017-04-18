import React, { Component } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import FitImage from 'react-native-fit-image';

var PolliBookFetch = require('./polli-book-fetch.js');
import styles from "./PolliStyles";

const fetcher = new PolliBookFetch();

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
