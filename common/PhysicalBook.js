import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import FitImage from 'react-native-fit-image';
import styles from "./PolliStyles";

import LocalLibraryDAO from './LocalLibraryDAO.js';
var LocalLibrary = new LocalLibraryDAO();

export default class PhysicalBook extends React.Component {
    static blendLevelIndexes = [
        "A",
        "B",
        "C",
        "D",
        "E"
    ]

    showReader(book) {
        global.currentBook=book;
        LocalLibrary.get(global.currentBook.bookId, this.updateThenDisplayBook.bind(this));
    }

    showDetails(book) {
        const { navigate } = this.props.navigation;
        global.currentBook=book;
        navigate('BookDetail');
    }

    updateThenDisplayBook(statsArray) {
        const { navigate } = this.props.navigation;
        var stats = statsArray[0] || {};
        console.log('stats for book ID ' + global.currentBook.bookId, stats);

        var navigationProps = {};
        navigationProps.blend = PhysicalBook.blendLevelIndexes[stats.blendLevel] || 'A';
        navigationProps.earmarkedPage = stats.earmarkedPage || 1;

        navigate('Reader',navigationProps);
    }

    render() {
      const { navigate } = this.props.navigation;

      return (
        <TouchableOpacity
          onPress={() => this.showReader(this.props.book)}
          onLongPress={() => this.showDetails(this.props.book)}
          style={styles.physicalBook} >
          <Image
            source={{uri: this.props.book.thumbnail}}
            style={styles.thumbnail}
          />
        </TouchableOpacity>
      );
  }
}
