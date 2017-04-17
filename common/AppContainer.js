import React, { Component } from 'react';
import {
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  StatusBar,
  Platform,
  Slider,
} from 'react-native';

global.currentBook = null;

import GridView from 'react-native-grid-view';
import FitImage from 'react-native-fit-image';
import { StackNavigator } from 'react-navigation';

import PolliPicker from './Picker';

const TITLE_FONT_SIZE = /*Device.isIpad() ? 20 :*/ 14;
const AUTHOR_FONT_SIZE = /*Device.isIpad() ? 15 :*/ 9;
const BOTTOM_FONT_SIZE = /*Device.isIpad() ? 13 :*/ 11;
const BOOKS_PER_ROW = 2;

var Swiper = require('react-native-swiper');
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';

var Page = require('./Page.js');
var mixins = require('./Mixins');
var Toast = require('./Toast.js');

var PolliBookFetch = require('./polli-book-fetch.js');


const BOOK = require('./Book.js');
const BOOK_CHINESE = require('./Book-chinese.js');

var Reader = React.createClass({
  displayName : 'Reader',
  getInitialState : function() {
    return {
      page : 1,
      blend : 'A',
      contentWidth : Dimensions.get('window').width,
      contentHeight : Dimensions.get('window').height,
      statusBarShown : true,
      toastShown : false,
      toastData : null,
    }
  },
  updateBookSize : function(w, h) {
    this.setState({
      contentWidth : w,
      contentHeight : h
    });
  },
  componentDidMount : function(){
    //StatusBar.setHidden(true, 'slide');
    StatusBar.setBackgroundColor('blue');
  },
  layoutChange : function(e) {
    this.updateBookSize(e.nativeEvent.layout.width, e.nativeEvent.layout.height);
  },
  hideToast() {
    this.setState({
      toastShown: false,
      toastData: null,
    });
  },
  showToast(L1, L2, currentLang) {
    this.setState({
      toastShown: true,
      toastData: {
        L1: L1,
        L2: L2,
        currentLang: currentLang,
      }
    });
  },
  render : function() {
    return (
      <View
        style={[
          styles.container,
          this.border('yellow'),
          mixins.styleOverride(global.currentBook),
          mixins.styleOverride(global.currentBook.pages[this.state.page-1]),
        ]}>
        <Toast
          isVisible={this.state.toastShown}
          onDismiss={this.hideToast}
          position="bottom"
          node={this.state.toastData}
        />
        {this.renderTopMenu()}
        <View style={styles.book}>
          <View
            style={[styles.content, this.border('blue')]}
            onLayout={this.layoutChange}
            ref="contentWrapper">
              <Swiper
                style={[styles.pages, this.border('black')]}
                showsPagination={false}
                loop={false}
                horizontal={true}
                index={this.state.page - 1}
                showsButtons={true}
                onMomentumScrollEnd={this.setCurrentPage}
                width={this.state.contentWidth}
                height={this.state.contentHeight}
              >
                {this.getPages()}
              </Swiper>
          </View>
        </View>
        {this.renderBottomMenu()}
      </View>
    );
  },
  nextPage : function() {
    var color = '#BBB391';
    if(this.isLastPage())
    {
      color = "rgba(0,0,0,0)";
    }
    return <TouchableHighlight
      underlayColor="rgba(0,0,0,0.2)"
      onPress={this.handleNextPage}
      style={[styles.nextPage, this.border('orange')]}>
        <Icon name="arrow-right" size={50} color={color} />
      </TouchableHighlight>
  },
  prevPage : function() {
    var color = '#BBB391';
    if(this.isFirstPage())
    {
      color = "rgba(0,0,0,0)";
    }
    return <TouchableHighlight
      underlayColor="rgba(0,0,0,0.2)"
      onPress={this.handlePrevPage}
      style={[styles.prevPage, this.border('pink')]}>
        <Icon name="arrow-left" size={50} color={color} />
      </TouchableHighlight>
  },
  handleNextPage : function() {
    this.hideToast()
    if(this.isLastPage()) {
      return;
    }

    this.setState({
      page : this.state.page + 1
    })
  },
  handlePrevPage : function() {
    this.hideToast()
    if(this.isFirstPage()) {
      return;
    }

    this.setState({
      page : this.state.page - 1
    })
  },
  isFirstPage : function() {
    return this.state.page == 1;
  },
  isLastPage : function() {
    return this.state.page == global.currentBook.pages.length;
  },
  getPages : function() {
    return global.currentBook.pages.map((page, index) => {
      return <Page
        key={'p' + index}
        page={page.content}
        blend={this.state.blend}
        onToast={this.showToast}></Page>
    } );
  },
  setCurrentPage : function(e, swiper) {
    this.setState({
      page : swiper.index + 1
    });
  },

  toggleStatusBar : function() {
    var show = !this.state.statusBarShown;
    StatusBar.setHidden(show, 'slide');
    this.setState({
      statusBarShown : show
    });
  },

  renderTopMenu : function() {
    return <View
        style={[styles.topMenu, styles.menu, this.border('green')]}>
      <View style={[styles.topMenuLeft]}>
        <Text></Text>
      </View>
      <View style={[styles.topMenuCenter]}>
          <Text onPress={this.toggleStatusBar} style={styles.bookTitle}>{global.currentBook.title}</Text>
      </View>
      <View style={[styles.topMenuRight]}>
        <Text onPress={this.toggleStatusBar} style={styles.bookAuthor}>{global.currentBook.author}</Text>
      </View>
    </View>
  },
  renderBottomMenu : function() {
    return <View style={[styles.bottomMenu, styles.menu, this.border('green')]}>
      <View style={[styles.bottomMenuLeft]}>
        <PolliPicker blend={this.state.blend} onValueChange={(key)=>{this.setState({blend: key})}}/>
      </View>
      <View style={[styles.bottomMenuCenter]}>
        <Text style={styles.bottomMenuLabels}>Page {this.state.page}</Text>
      </View>
      <View style={[styles.bottomMenuRight]}>
        <Text style={styles.bottomMenuLabels}>{this.getPageLeftText()}</Text>
      </View>
    </View>
  },
  getPageLeftText : function() {
    var numPagesLeft = global.currentBook.pages.length - this.state.page;
    if(numPagesLeft == 0) {
      return '';
    }
    if(numPagesLeft == 1) {
      return '1 Page Left';
    }

    return numPagesLeft + ' Pages Left';
  },
  //HELPER
  //TODO: remove
  border : function(color) {
    return {
      // borderWidth : 3,
      // borderColor : color
    }
  }
});


var controlsColor = '#583919';
var styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : 'stretch',
    justifyContent : 'center',
    backgroundColor: '#F5F2DE'
  },
  menu : {
    alignItems : 'stretch',
    flexDirection : 'row',
  },
  topMenu : {
    flex : 1
  },
  bottomMenu : {
    flex : 1,
  },
  book : {
    flex : 18,
    flexDirection : 'row',
    alignItems : 'stretch'
  },
  content : {
    flex : 16,
  },
  nextPage : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center'
  },
  prevPage : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center'
  },
  page : {
    flex : 1
  },

  //top menu
  topMenuLeft : {
    flex : 3,
    alignItems : 'center',
    justifyContent : 'center'
  },
  topMenuCenter : {
    flex : 10,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
    paddingTop: 20
  },
  topMenuRight : {
    flex : 3,
    alignItems : 'center',
    justifyContent : 'center',
    paddingTop: 20
  },
  bigTitle : {
      fontFamily: 'Lora',
      fontSize: 40,
      marginBottom: 20
  },
  bookTitle : {
    fontFamily : 'Open Sans',
    color : controlsColor,
    fontSize : TITLE_FONT_SIZE
  },
  bookAuthor : {
    fontFamily : 'Open Sans',
    color : controlsColor,
    fontSize : AUTHOR_FONT_SIZE,
    fontWeight : '600'
  },
  physicalBook : {
      margin: 12,
      padding: 5,
      backgroundColor: '#fff',
      borderRadius: 3,
      shadowColor: "#000000",
      shadowOpacity: 0.6,
      shadowRadius: 2,
      shadowOffset: {
          height: 0,
          width: 0
        }
  },
  galleryContainer : {
      paddingTop: 40,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: 'rgba(230,216,189,1)',
      flex: 1
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

  listView : {

  },

  //bottom menu
  bottomMenuLeft : {
    flex : 7,
    ...Platform.select({
        ios: {
          alignItems : 'center',
        },
        android: {
          alignItems : 'flex-end',
        }
    }),
    justifyContent : 'center'
  },
  bottomMenuCenter : {
    flex : 6,
    alignItems : 'center',
    justifyContent : 'center'
  },
  bottomMenuRight : {
    flex : 7,
    alignItems : 'center',
    justifyContent : 'center'
  },
  bottomMenuLabels : {
    fontFamily : 'Open Sans',
    fontSize: BOTTOM_FONT_SIZE,
    color : controlsColor,
  },
  picker: {
    width: 125,
  },

  //details screen
  detailContainer: {
    flex: 1,
    //borderWidth: 2,
    margin: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailTitle: {
    height: 200,
    flexDirection: 'row',
    //borderWidth: 2,
  },
  detailTitleRight: {
    margin: 20,
  },
  detailTitleBook: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  detailTitleText: {
    fontSize: 20,
    justifyContent: 'center',
  },
  detailIconContainer: {
    flexDirection:'row',
    justifyContent: 'center',
    margin: 10,
  },
  detailIcon: {
    marginRight: 20,
  },
  detailThumbnail: {
    borderWidth: 2,
    width: 120,
  },
  detailMain: {
    //marginTop: 30,
    alignItems:'flex-start',
  },
  detailBottom: {
    alignItems: 'center',
  },
  detailTitleRating: {
    flexDirection:'row',
    marginTop: 10,
  },
  detailButton: {
    backgroundColor: 'green',
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 80,
    paddingLeft: 80,
    fontSize: 20,
  },
  detailSlider: {
    height: 10,
    margin: 10,
    width: 300,
  },
});

class PhysicalBook extends React.Component {

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

const fetcher = new PolliBookFetch();

class DownloadableBook extends React.Component {

    showReader(book) {
        const { navigate } = this.props.navigation;
        console.log('future book is:');
        console.log(book.title);
        global.currentBook = book;
        navigate('Reader');
    }

    fetchDone(book) {
        //var book = require(bookJsonPath);
        this.showReader(book);

    }

    downloadBook(bookDescriptor) {
        fetcher.fetchBook(bookDescriptor.bookId, this.showReader, this);

        //this.showReader(book);
    }

    render() {
      const { navigate } = this.props.navigation;

      return (
        <TouchableHighlight onPress={() => this.downloadBook(this.props.book)} style={styles.physicalBook} >
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



class FrontPage extends React.Component {

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

    class Bookstore extends React.Component {

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

class BookDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {sliderValue: 0.5};
  }

  getSliderLabel(value){
    switch (value){
      case 0:{
        return "95% English";
      }
      case 0.25:{
        return "Mostly English";
      }
      case 0.5:{
        return "50% Each";
      }
      case 0.75:{
        return "Mostly Spanish";
      }
      case 1:{
        return "95% Spanish";
      }
    }
  }

  render() {
    return (
      <View style={styles.detailContainer}>
        <View style={styles.detailTitle}>
          <Text style={styles.detailThumbnail}>image here</Text>
          <View style={styles.detailTitleRight}>
            <Text style={styles.detailTitleBook}>Book Title</Text>
            <Text style={styles.detailTitleText}>Author</Text>
            <View style={styles.detailTitleRating} >
              <Icon2 name="star" size={40} color='orange'/>
              <Icon2 name="star" size={40} color='orange' />
              <Icon2 name="star" size={40} color='orange' />
              <Icon2 name="star-half-o" size={40} color='orange' />
              <Icon2 name="star-o" size={40} color='orange' />
            </View>
          </View>
        </View>
        <View style={styles.detailMain}>
          <View style={styles.detailIconContainer}>
            <Icon2 style={styles.detailIcon} name="trophy" size={40} color='purple'/>
            <Text style={styles.detailTitleText}>I've read this book 4 times</Text>
          </View>
          <View style={styles.detailIconContainer}>
            <Icon2 style={styles.detailIcon} name="globe" size={40} color='blue'/>
            <Text style={styles.detailTitleText}>English and Spanish</Text>
          </View>

          <Slider value={this.state.sliderValue}
                  step={0.25}
                  style={styles.detailSlider}
                  onValueChange={(data)=>this.setState({sliderValue:data})}
                />

          <View style={styles.detailIconContainer}>
            <Icon2 style={styles.detailIcon} name="book" size={40} color='teal'/>
            <Text style={styles.detailTitleText}>{this.getSliderLabel(this.state.sliderValue)}</Text>
          </View>


        </View>
        <View style={styles.detailBottom}>
          <Text style={styles.detailButton}>Start reading!</Text>
        </View>
      </View>
    );
  }
}


const AppContainer = StackNavigator({
  Main: {screen: FrontPage},
  Reader: {screen: Reader},
  Library: {screen: Bookstore},
  BookDetail: {screen: BookDetail}
});

export default AppContainer;
