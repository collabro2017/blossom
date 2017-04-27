import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  Alert,
  Switch,
  LayoutAnimation,
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
          user: null,
          modalVisible: false
        }
      }

      componentDidMount() {
      console.log('did mount');
      this.updateBookList();

      window.EventBus.on('libraryUpdated', this.updateBookList.bind(this));
  }

  componentWillUpdate() {
      LayoutAnimation.easeInEaseOut();
  }

  updateBookList() {
      let downloadedBooks = LocalLibrary.getAll();
      var dataSourceArray = [BOOK, BOOK_CHINESE];

      for(var i=0; i<downloadedBooks.length; i++) {
          let bookDataObject = downloadedBooks[i];
          RNFetchBlob.fs.readFile(`${bookDataObject.path}book.json`, 'utf8')
            .then((data) => {
                var book = new ObjectCreator(JSON.parse(data));

                book.thumbnail = `file://${bookDataObject.path}${book.cover_image_thumbnail}`;

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
    }

    renderItem(item) {
        return <PhysicalBook book={item} key={item.bookId} navigation={ this.navigation } />
    }

    render() {
    const { navigation } = this.props;

    var userBar = null;
    if(this.state.user) {
        userBar = (<View style={styles.userbar}>
            <Text style={styles.userBarText}>Demo user logged in</Text>
        </View>);
    }

    var showDebugMenuButton = null;
    if (__DEV__) {
        showDebugMenuButton = <Button
          onPress={() => this.setState({modalVisible : true}) }
          title="▲ Debug Menu"
          color="black"
          accessibilityLabel="Show debug menu"
        />
    }

    var frontPageOverlay = null;
    if (this.state.modalVisible) {
        frontPageOverlay = <View style={styles.frontPageOverlay} />
    }

    function showLibrary(user) {
        if(user) {
            navigation.navigate('Library');
        }
        else {
            //no user logged in
            Alert.alert(
              '',
              'Subscribe to Polli to get access to all of our titles for $5/month',
              [
                {text: 'Subscribe', onPress: () => console.log('Register pressed')},
                {text: 'Not right now', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'I have a subscription', onPress: () => console.log('Log in Pressed')},
              ],
              { cancelable: true }
            )
        }
    }

    function showAlert(text, actionIfYes) {
        Alert.alert(
          'Are you sure?',
          text,
          [
            {text: 'Do it, man!', onPress: () => actionIfYes},
            {text: 'Nah', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          ],
          { cancelable: true }
        )
    }

    return <View style={styles.frontPage}>
        {userBar}
        {frontPageOverlay}
        <View style={styles.buttonContainer}>
            <Button
              onPress={() => showLibrary(this.state.user) }
              title="&#128218; Get more books in the Library &#128218;"
                  color="#222288"
              accessibilityLabel="Get more books in the library"
            />
        </View>
        <View style={styles.galleryContainer}>
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {alert("Modal has been closed.")}}
                style={styles.modal}
                >
                <View style={styles.modal}>
                    <View>
                        <Button
                            onPress={() => showAlert('Clearing the book DB means all the books you\'ve downloaded will stay on disk, but their DB references will be gone. You can still re-download them. Do you still want to clear the book DB?',
                                LocalLibrary.clearDB()) }
                            title="Clear downloaded book DB"
                            accessibilityLabel="Clear downloaded book DB"
                        />
                        <View style={styles.switchContainer}>
                            <Text style={styles.switchLabel}>Demo user logged in</Text>
                            <Switch
                              onValueChange={(value) => this.setState({user: value})}
                              value={this.state.user}
                            />
                        </View>
                        <Button
                          onPress={() => this.setState({modalVisible:false}) }
                          title="Dismiss"
                          color="#880000"
                          accessibilityLabel="Dismiss"
                        />
                    </View>
                </View>
            </Modal>


            <GridView
                items={this.state.dataSource}
                itemsPerRow={BOOKS_PER_ROW}
                renderItem={this.renderItem}
                contentContainerStyle={styles.listView}
                navigation={ navigation }
            />
            {showDebugMenuButton}
        </View>
    </View>
  }
}
