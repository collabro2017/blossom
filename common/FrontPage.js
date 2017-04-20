import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

import GridView from 'react-native-grid-view';

import styles from './PolliStyles';
import PhysicalBook from './PhysicalBook';

import RNFetchBlob from 'react-native-fetch-blob';
import LocalLibraryDAO from './LocalLibraryDAO.js';

var LocalLibrary = new LocalLibraryDAO();

function ObjectCreator(obj) { // CONSTRUCTOR CAN BE OVERLOADED WITH AN OBJECT
  // IF AN OBJECT WAS PASSED THEN INITIALISE PROPERTIES FROM THAT OBJECT
  for (var prop in obj) this[prop] = obj[prop];
}

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

      componentDidMount() {
      console.log('did mount');
      this.updateBookList();

      window.EventBus.on('libraryUpdated', this.updateBookList.bind(this));
  }

  eventReceived() {
      console.log('woohoo!');
  }

  updateBookList() {
      let downloadedBooks = LocalLibrary.getAll();
      var dataSourceArray = [BOOK, BOOK_CHINESE];

      for(var i=0; i<downloadedBooks.length; i++) {
          let bookDataObject = downloadedBooks[i];
          RNFetchBlob.fs.readFile(`${bookDataObject.path}book.json`, 'utf8')
            .then((data) => {
                var book = new ObjectCreator(JSON.parse(data));

                book.thumbnail = `file://${bookDataObject.path}${book.thumbnail}`;

                for(i=0; i<book.pages.length; i++) {
                    var page = book.pages[i];
                    for(j=0; j<page.content.length; j++) {
                        var node = page.content[j];
                        if(node.type == 'image') {
                            // divert image from assets to absolute paths
                            node.src = `file://${bookDataObject.path}${node.src}`;
                        }
                    }
                }
                dataSourceArray.push(book);

                this.setState ({
                  dataSource: dataSourceArray,
                });
          })
          .catch((error) => {
              console.log('error when updating book list >> ', error);
          })
      }
      console.log('Number of books in library: ', downloadedBooks.length);
  }


    static navigationOptions = {
      title: 'My Books',
    };

    renderItem(item) {
            return <PhysicalBook book={item} key={item.bookId} navigation={ this.navigation } />
    }

    render() {
    const { navigation } = this.props;

    var clearDatabaseButton = '';
    if (__DEV__) {
        clearDatabaseButton = <Button
          onPress={() => LocalLibrary.clearDB() }
          title="Clear DB"
              color="#882222"
          accessibilityLabel="Clear DB"
        />
    }

    return  <View style={styles.galleryContainer}>
        <View style={styles.buttonContainer}>
            <Button
              onPress={() => navigation.navigate('Library') }
              title="Get more books in the Library"
                  color="#222288"
              accessibilityLabel="Get more books in the library"
            />
            {clearDatabaseButton}
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
