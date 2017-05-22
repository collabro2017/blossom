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
  FlatList,
  Image,
  Dimensions,
} from 'react-native';

import styles, {propStyles} from './PolliStyles';
import PhysicalBook from './PhysicalBook';

import Device from 'react-native-device-detection';

import RNFetchBlob from 'react-native-fetch-blob';
import LocalLibraryDAO from './LocalLibraryDAO.js';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

var LocalLibrary = new LocalLibraryDAO();

function ObjectCreator(obj) { // CONSTRUCTOR CAN BE OVERLOADED WITH AN OBJECT
  // IF AN OBJECT WAS PASSED THEN INITIALISE PROPERTIES FROM THAT OBJECT
  for (var prop in obj) this[prop] = obj[prop];
}

const BOOKS_PER_ROW = Device.isTablet? 4 : 2;
const BOOKS_TO_RENDER = 3;

const BOOK = require('./Book.js');
const BOOK_CHINESE = require('./Book-chinese.js');
const second_shelf = [
    {
        bookId: 1,
        title:"Charlotte's Web",
        thumbnail: 'https://s3.amazonaws.com/polli-static/images/sample_covers/cw.jpg'
    },
    {
        bookId: 2,
        title:'Frog and Toad Are Friends',
        thumbnail: 'https://s3.amazonaws.com/polli-static/images/sample_covers/ft.jpg'
    },
    {
        bookId: 3,
        title:'Green Eggs and Ham',
        thumbnail: 'https://s3.amazonaws.com/polli-static/images/sample_covers/eh.jpg'
    },
    {
        bookId: 4,
        title:'Harold and the Purple Crayon',
        thumbnail: 'https://s3.amazonaws.com/polli-static/images/sample_covers/hp.jpg'
    },
    {
        bookId: 5,
        title:'Matilda',
        thumbnail: 'https://s3.amazonaws.com/polli-static/images/sample_covers/mt.jpg'
    },
    {
        bookId: 6,
        title:'The Phantom Tollbooth',
        thumbnail: 'https://s3.amazonaws.com/polli-static/images/sample_covers/pb.jpg'
    }
]

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
      for(var i=0; i <= BOOKS_PER_ROW - dataSourceArray.length; i++) {
          dataSourceArray.push({"type" : "invisibleBook", "key" : `invisibleBook_${i}`})
      }

      console.log("BOOKS_PER_ROW", dataSourceArray);

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

    renderItem = ({item}) => {
        const {navigation} = this.props;
        if(item.bookId) {
            return <PhysicalBook book={item} key={item.bookId} navigation={ navigation } />
        }

        if(item.type == "invisibleBook") {
            return <View key={item.key} style={styles.invisibleBook} />
        }

        if(item.type == "settings"){
            if (Platform.OS === 'android'){
              return null;
            }else{
              return <View key="settings">
              <Icon.Button
                style={styles.detailIcon}
                name="settings"
                color={"#888"}
                underlayColor={'#ddd'}
                backgroundColor={"transparent"}
                onPress={() => this.navigation.navigate('UserSettings') }
              ><Text style={styles.frontpageButtonLabel}>Settings</Text></Icon.Button>
              <Icon.Button
                style={styles.detailIcon}
                name="logout"
                color={"#888"}
                underlayColor={'#ddd'}
                backgroundColor={"transparent"}
                onPress={() => {global.user=null;this.navigation.navigate('LoginPage')} }
              ><Text style={styles.frontpageButtonLabel}>Logout</Text></Icon.Button>
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

    renderShelf(data,title){
      const {navigation} = this.props;
      return (
        <View>
          <View style={styles.galleryShelfTitle}><Text style={styles.galleryShelfTitleText}>{title}</Text></View>

          <View style={styles.galleryShelfRectangle} />

          <View style={styles.galleryShelfTopContainer}>
            <View style={styles.galleryShelfTriangle} />
            <View style={styles.galleryShelfTop} />

          </View>

          <FlatList
              horizontal
              data={data}
              renderItem={this.renderItem}
              initialNumToRender={BOOKS_TO_RENDER}
              navigation={ navigation }
          />

        </View>
      );
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

            showDebugMenuButton = <View style={{margin:35,bottom:35}}><Button
              onPress={() => this.setState({modalVisible : true}) }
              title="▲ Debug Menu"
              color="black"
              accessibilityLabel="Show debug menu"
            /></View>
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

            {this.renderShelf(this.state.dataSource,'Downloaded books:')}
            {this.renderShelf(second_shelf,'Recommended from Bookstore:')}

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

  function logout() {
    global.user = null;
    navigation.navigate('LoginPage');
  }

  if (Platform.OS === 'android'){
    var settingsIcon = (
    <Icon
      style={styles.detailIcon}
      name="settings"
      title="Settings"
      color={"#888"}
      size={propStyles.iconSize}
      onPress={() => showSettings() }
    />);
    var logoutIcon = (
    <Icon
      style={styles.detailIcon}
      name="logout"
      title="Logout"
      color={"#888"}
      size={propStyles.iconSize}
      onPress={() => logout() }
    />);
  }else{
    var settingsIcon = null;
    var logoutIcon = null;
  }

  return {
      title: 'My Books',
      headerRight: (
      <View style={{flexDirection:'row'}}>
        <Icon
          style={styles.detailIcon}
          name="library"
          title="Bookstore"
          color={"rgba(100,189,189,1)"}
          size={propStyles.iconSize}
          onPress={() => showLibrary() }
        />
        {settingsIcon}
        {logoutIcon}
      </View>
    ),
  };
};
