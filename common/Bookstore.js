import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import DownloadableBook from './DownloadableBook';

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
      }

    var demoBook2 = {
        "title": "Friends for Toddlers",
        "thumbnail": 'https://images-na.ssl-images-amazon.com/images/I/51XSMSDZBFL._SY344_BO1,204,203,200_.jpg',
        "L1": 'English',
        "L2": 'Spanish',
        "author": "Loolie",
        "bookId": "friends-rabbit",
    }

    var demoBook3 = {
          "title": "Bananas: A Deep Analysis",
          "thumbnail": 'https://scontent-frt3-1.xx.fbcdn.net/v/t1.0-9/17499197_10154290656191366_6391349757135483406_n.jpg?oh=fa79f01cd80d93656dddbc666c948a2b&oe=59602942',
          "L1": 'English',
          "L2": 'Spanish',
          "author": "Loolie",
          "bookId": "banana-rabbit",
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

var styles = StyleSheet.create({
  storeGalleryContainer : {
        paddingTop: 40,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'rgba(100,189,189,1)',
        flex: 1
    },

  listView : {

  },
});
