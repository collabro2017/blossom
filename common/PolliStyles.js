import React from 'react';
import {
  StyleSheet,
  Platform,
} from 'react-native';

const TITLE_FONT_SIZE = /*Device.isIpad() ? 20 :*/ 14;
const AUTHOR_FONT_SIZE = /*Device.isIpad() ? 15 :*/ 9;
const BOTTOM_FONT_SIZE = /*Device.isIpad() ? 13 :*/ 11;

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
      height: 250,
      width: 150,
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

    switchContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 4
    },

    switchLabel: {
        fontSize: 18,
        color: '#666',
        padding: 10
    },

    modal: {
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 100,
        marginLeft: 40,
        marginRight: 40,
        backgroundColor: 'white',
        shadowColor: "#000000",
        shadowOpacity: 1,
        shadowRadius: 28,
        shadowOffset: {
            height: 0,
            width: 0
        },
        borderRadius: 2
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
  thumbnail: {

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
    flexDirection: 'row',
    //borderWidth: 2,
  },
  detailTitleRight: {
    margin: 20,
    flexWrap: 'wrap',
    flex: 0.6,
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
    borderColor: 'black',
    borderWidth: 2,
    width: 120,
    height: 200,
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
  detailSliderLabel: {
    alignItems:'center',
    borderWidth: 3
  }
});

module.exports = styles;
