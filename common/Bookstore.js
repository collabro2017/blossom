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
          "title": "War and Peace",
          "thumbnail": 'https://images-na.ssl-images-amazon.com/images/I/510UE7bvHoL._SY344_BO1,204,203,200_.jpg',
          "L1": 'English',
          "L2": 'German',
          "author": "Loolie",
          "bookId": "peter-rabbit",
          "about": "A novel by the Russian author Leo Tolstoy, which is regarded as a central work of world literature and one of Tolstoy's finest literary achievements",
          "ages": "60+",
          "publisher": "The Russian Messenger",
          "rating": 1.5,
      }

    var demoBook2 = {
        "title": "Friends for Toddlers",
        "thumbnail": 'https://images-na.ssl-images-amazon.com/images/I/51XSMSDZBFL._SY344_BO1,204,203,200_.jpg',
        "L1": 'English',
        "L2": 'Spanish',
        "author": "Loolie",
        "bookId": "friends-rabbit",
        "about": "Friends is an American television sitcom, created by David Crane and Marta Kauffman, which aired on NBC from September 22, 1994, to May 6, 2004, lasting ten seasons",
        "ages": "Definitely EVERYONE!",
        "publisher": "NBC",
        "rating": 3.7,
    }

    var demoBook3 = {
          "title": "Bananas: A Deep Analysis",
          "thumbnail": 'https://scontent-frt3-1.xx.fbcdn.net/v/t1.0-9/17499197_10154290656191366_6391349757135483406_n.jpg?oh=fa79f01cd80d93656dddbc666c948a2b&oe=59602942',
          "L1": 'English',
          "L2": 'Spanish',
          "author": "Loolie",
          "bookId": "banana-rabbit",
          "about": "BANANA BA NA NA NA BAAAAAA BANANA BANANA BA NA NA NA BAAAAAA BANANA BANANA BA NA NA NA BAAAAAA BANANA BANANA BA NA NA NA BAAAAAA BANANA BANANA BA NA NA NA BAAAAAA BANANA BANANA BA NA NA NA BAAAAAA BANANA BANANA BA NA NA NA BAAAAAA BANANA BANANA BA NA NA NA BAAAAAA BANANA BANANA BA NA NA NA BAAAAAA BANANA BANANA BA NA NA NA BAAAAAA BANANA BANANA BA NA NA NA BAAAAAA BANANA BANANA BA NA NA NA BAAAAAA BANANA ",
          "ages": "1-2",
          "publisher": "PutzkyPress",
          "rating": 4.9,
      }


    this.state = {
      dataSource: [ demoBook, demoBook2, demoBook3],
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
