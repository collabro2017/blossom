import React, { Component } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import FitImage from 'react-native-fit-image';
import styles from "./PolliStyles";

export default class PhysicalBook extends React.Component {

    showReader(book) {
        const { navigate } = this.props.navigation;
        global.currentBook=book;
        navigate('Reader');
    }

    showDetails(book) {
        const { navigate } = this.props.navigation;
        global.currentBook=book;
        navigate('BookDetail');
    }

    render() {
      const { navigate } = this.props.navigation;

      return (
        <TouchableHighlight
          onPress={() => this.showReader(this.props.book)}
          onLongPress={() => this.showDetails(this.props.book)}
          style={styles.physicalBook} >
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
