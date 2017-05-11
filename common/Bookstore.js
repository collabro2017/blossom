import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
} from 'react-native';

import DownloadableBook from './DownloadableBook';
import styles from "./PolliStyles";

import GridView from 'react-native-grid-view';
const BOOKS_PER_ROW = 2;

export default class Bookstore extends React.Component {

  constructor(props) {
    super(props);

    var demoBook = {
          "title": "Rapunzel",
          "thumbnail": 'Rapunzel.jpg',
          "L1": 'English',
          "L2": 'Spanish',
          "author": "Jacob and William Grimm",
          "bookId": "1",
          "about": "\"Rapunzel, Rapunzel, let down your hair!\" calls the witch to the beautiful girl imprisoned in her tower, and Rapunzel lowers her long, golden braid for the witch to climb.",
          "ages": "3+",
          "publisher": "NordSed Switzerland",
          "rating": 4,
      }

    var demoBook2 = {
        "title": "I will help you",
        "thumbnail": 'i-will-help-you-cover-600x590.jpg',
        "L1": 'English',
        "L2": 'Spanish',
        "author": "Andrea Abbott",
        "bookId": "i-will-help-you",
        "about": "When Mama Heron needs help, Lungile comes to her rescue.",
        "ages": "All",
        "publisher": "Bookdash",
        "rating": 3,
    }

    var demoBook3 = {
          "title": "Little Red Riding Hood",
          "thumbnail": 'Little Red Riding Hood.jpg',
          "L1": 'English',
          "L2": 'Spanish',
          "author": "Joy Cowley",
          "bookId": "3",
          "about": "A cautionary fairy tale about the dangers of letting strangers into your home.",
          "ages": "4+",
          "publisher": "Big And Small Publishing",
          "rating": 4.9,
      }

      var demoBook4 = {
            "title": "Hansel and Gretel",
            "thumbnail": 'Hansel and Gretel.jpg',
            "L1": 'English',
            "L2": 'Spanish',
            "author": "Eric Blair",
            "bookId": "4",
            "about": "What not to do when strangers offer candy.",
            "ages": "5+",
            "publisher": "Picture Window Books",
            "rating": 4,
        }

      var demoBook5 = {
            "title": "Rumpelstiltskin",
            "thumbnail": 'Rumpel-book-cover.jpg',
            "L1": 'English',
            "L2": 'Spanish',
            "author": "Parragon Books",
            "bookId": "5",
            "about": "This clear, simple retelling of the classic children's story of a Rumpelstiltskin helps with children's speech and language skills as they learn first words.",
            "ages": "4-7",
            "publisher": "Parragon Books",
            "rating": 4.5,
        }


    this.state = {
      dataSource: [ demoBook, demoBook2, demoBook3, demoBook4, demoBook5],
    }
  }
  static navigationOptions = {
    title: 'Library',
  };

  renderItem(item) {
      return <DownloadableBook key={item.bookId} book={item} navigation={ this.navigation } />
  }

  componentWillUpdate() {
      LayoutAnimation.easeInEaseOut();
  }

  render() {
      const { navigation } = this.props;
      return  <View style={styles.storeGalleryContainer}>
          <GridView
              items={this.state.dataSource}
              itemsPerRow={BOOKS_PER_ROW}
              renderItem={this.renderItem}
              contentContainerStyle={styles.listView}
              navigation={ navigation }
            />
      </View>
  }
}
