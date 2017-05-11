import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  Alert,
  Switch,
  TouchableWithoutFeedback,
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
          demoUserSwitchOn: false,
          modalVisible: false,
          tutorialVisible: false,
        }
      }

      componentDidMount() {
          console.log('did mount');
          global.user = null;
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
              console.log(`error when updating book list >> ${bookDataObject.path} >>`, error);
          })
      }
      console.log('Number of books in library: ', downloadedBooks.length);
  }

    renderItem(item) {
        return <PhysicalBook book={item} key={item.bookId} navigation={ this.navigation } />
    }

    showTutorial(context) {
        console.log(this.name);
        context.setState({ modalVisible: false});

        setTimeout(function() {
            context.setState({ tutorialVisible: true});
        }, 10);
    }

    showSettings() {
      const { navigate } = this.props.navigation;
      navigate('UserSettings');
    }

    enableDemoUser(shouldEnable) {
        global.user = shouldEnable;
        console.log(`switch on: ${shouldEnable}`);
        this.setState({demoUserSwitchOn: shouldEnable, modalVisible:false});
    }

    render() {
        const { navigation } = this.props;

        var userBar = null;
        if(global.user) {
            userBar = (<View style={styles.userbar}>
                <Text style={styles.userBarText}>Demo user logged in</Text>
            </View>);
        }

        var showDebugMenuButton = null;
        if (__DEV__) {
            console.ignoredYellowBox = ['Warning: You are manually calling'];

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
            {/*<View style={styles.buttonContainer}>
                <Button
                  onPress={() => showLibrary(global.user) }
                  title="&#128218; Get more books in the Library &#128218;"
                      color="#222288"
                  accessibilityLabel="Get more books in the library"
                />
            </View>*/}
            <View style={styles.galleryContainer}>
                <Modal
                visible={this.state.tutorialVisible}
                animationType={"fade"}
                transparent={true}
                >
                    <TouchableWithoutFeedback onPress={() => this.setState({tutorialVisible: false})}>
                        <View>
                            <View style={{ width: 3000, height: 3000, borderRadius: 1500, backgroundColor: 'rgba(0,0,0,0)', borderWidth: 1400, borderColor: 'rgba(0,0,0,0.75)', position: 'absolute', top: -1500, left: -1500 }} >
                            </View>
                            <Text style={{color:'white', fontSize: 20, position: 'absolute', left: 110, top: 30, shadowColor: "#000000",
                            shadowOpacity: 0.6,
                            shadowRadius: 2,
                            shadowOffset: {
                                height: 0,
                                width: 0
                            } }}>This is the start of a tutorial view.{"\n"}Just a demo. Tap anywhere.</Text>
                            <View style={{height: 200}} />
                            <Button
                                onPress={() => this.setState({tutorialVisible: false})}
                                title="Get started"
                                accessibilityLabel="Get started"
                                color="#00DDAA"
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
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
                            <Button
                                onPress={() => this.showTutorial(this) }
                                title="Show (experimental) tutorial"
                                accessibilityLabel="Show tutorial"
                            />
                            <View style={styles.switchContainer}>
                                <Text style={styles.switchLabel}>Demo user logged in</Text>
                                <Switch
                                  onValueChange={(value) => this.enableDemoUser(value)}
                                  value={this.state.demoUserSwitchOn}
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
            <View style={styles.settingsButtonContainer}>
                <Button
                  title="User Settings"
                  color="grey"
                  style={styles.settingsButton}
                  onPress={() => this.showSettings() }
                />
            </View>


            {showDebugMenuButton}
        </View>
    </View>
  }
}

FrontPage.navigationOptions = props => {
  const {navigation} = props;
  const {state, setParams} = navigation;
  const {params} = state;

  function showLibrary() {
      console.log("go to library", global.user)
      if(global.user) {
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

  return {
      title: 'My Books',
      headerRight: (
      <Button
        title={'Bookstore'}
        color='#222288'
        onPress={() => showLibrary() }
        accessibilityLabel='Get more books in the Bookstore'
      />
    ),
  };
};
