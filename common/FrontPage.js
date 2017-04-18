import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

import GridView from 'react-native-grid-view';

import PhysicalBook from './PhysicalBook';

const BOOKS_PER_ROW = 2;

const BOOK = require('./Book.js');
const BOOK_CHINESE = require('./Book-chinese.js');

export default class FrontPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          dataSource: [BOOK, BOOK_CHINESE],
        }
      }

      static navigationOptions = {
          title: 'My Books',
        };

    renderItem(item) {
            return <PhysicalBook book={item} key={item.bookId} navigation={ this.navigation } />
    }

    render() {
    const { navigation } = this.props;
    return  <View style={styles.galleryContainer}>
        <View style={styles.buttonContainer}>
            <Button
              onPress={() => navigation.navigate('Library') }
              title="Get more books in the Library"
                  color="#222288"
              accessibilityLabel="Get more books in the library"
            />
        </View>
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
  galleryContainer : {
      paddingTop: 40,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: 'rgba(230,216,189,1)',
      flex: 1
  },
  listView : {

  },
  storeGalleryContainer : {
    paddingTop: 40,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'rgba(100,189,189,1)',
    flex: 1
  },
  buttonContainer : {
    backgroundColor: 'white',
  },
});
