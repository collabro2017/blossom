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
  Platform,
} from 'react-native';

import GridView from 'react-native-grid-view';

import styles from './PolliStyles';
import PhysicalBook from './PhysicalBook';

import RNFetchBlob from 'react-native-fetch-blob';
import LocalLibraryDAO from './LocalLibraryDAO.js';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
          demoUserSwitchOn:  global.user,
          modalVisible: false,
          tutorialVisible: false,
        }
      }

  componentDidMount() {
    if (this.state.demoUserSwitchOn){
      console.log('did mount with demo user');
    }else{
      console.log('did mount with anon user');
    }
    this.updateBookList();

    window.EventBus.on('libraryUpdated', this.updateBookList.bind(this));
  }

  componentWillUpdate() {
      LayoutAnimation.easeInEaseOut();
  }

  addSettingsToGrid(dataSourceArray) {
      console.log('addSettingsToGrid');
      if(dataSourceArray.length % 2) {
          dataSourceArray.push({"type" : "invisibleBook"})
      }

      dataSourceArray.push({"type" : "settings"});

      this.setState ({
        dataSource: dataSourceArray,
      });
  }

  updateBookList() {
      let downloadedBooks = LocalLibrary.getAll().filtered('path != \'\'');
      var dataSourceArray = [BOOK, BOOK_CHINESE];

      if(!downloadedBooks.length) {
          this.addSettingsToGrid(dataSourceArray);
      }

      for(var bookIndex=0; bookIndex<downloadedBooks.length; bookIndex++) {
          let bookDataObject = downloadedBooks[bookIndex];

          RNFetchBlob.fs.readFile(`${bookDataObject.path}book.json`, 'utf8')
            .then((data) => {
                var book = new ObjectCreator(JSON.parse(data));

                book.thumbnail = `file://${bookDataObject.path}${book.cover_image_thumbnail}`;

                for(var i=0; i<book.pages.length; i++) {
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

                if(bookIndex>=downloadedBooks.length - 1) {
                    console.log('Number of books in library: ', downloadedBooks.length);
                    this.addSettingsToGrid(dataSourceArray);
                }
          })
          .catch((error) => {
              console.log(`error when updating book list >> ${bookDataObject.path} >>`, error);
          })
      }

  }

    renderItem(item) {
        console.log("item", item)
        if(item.bookId) {
            return <PhysicalBook book={item} key={item.bookId} navigation={ this.navigation } />
        }

        if(item.type == "invisibleBook") {
            return <View key="invisibleBook" style={styles.invisibleBook} />
        }

        if(item.type == "settings"){
            if (Platform.OS === 'android'){
              return null;
            }else{
              return <View key="settings">
              <Icon.Button
                style={styles.detailIcon}
                name="settings"
                size={30}
                color={"#888"}
                backgroundColor={"transparent"}
                onPress={() => this.navigation.navigate('UserSettings') }
              ><Text style={{fontSize:18, color:'#888'}}>Settings</Text></Icon.Button>

              </View>
            }
        }
    }

    showTutorial(context) {
        console.log(this.name);
        context.setState({ modalVisible: false});

        setTimeout(function() {
            context.setState({ tutorialVisible: true});
        }, 10);
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

  function showSettings() {
    navigation.navigate('UserSettings');
  }

  if (Platform.OS === 'android'){
    var settingsIcon = (
    <Icon
      style={styles.detailIcon}
      name="settings"
      title="Settings"
      size={30}
      color={"#888"}
      onPress={() => showSettings() }
    />);
  }else{
    var settingsIcon = null;
  }

  return {
      title: 'My Books',
      headerRight: (
      <View style={{flexDirection:'row'}}>
        <Icon
          style={styles.detailIcon}
          name="library"
          title="Bookstore"
          size={30}
          color={"rgba(100,189,189,1)"}
          onPress={() => showLibrary() }
        />
        {settingsIcon}
      </View>
    ),
  };
};
