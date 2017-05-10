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
        shadowColor: "#000000",
        shadowOpacity: 0.25,
        shadowRadius: 5,
        shadowOffset: {
            height: 2,
            width: 0
        },
        zIndex: 9999
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
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
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
    height:180,
    width:140,
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
    lineHeight: 35,
  },
  detailInfoText: {
    fontSize: 18,
    justifyContent: 'center',
    marginBottom: 10,
  },
  detailInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  detailIconContainer: {
    flexDirection:'row',
    justifyContent: 'center',
    margin: 10,
  },
  detailInfoContainer: {
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
    flexDirection: 'row',
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
  detailButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  detailLibraryButton: {
    backgroundColor: 'green',
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 40,
    paddingLeft: 40,
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
  },
  downloadOverlay: {
      backgroundColor: 'rgba(0,120,0,0.6)',
      height: 250,
      width: 150,
      left: -5,
      top: -5,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center'
  },
  frontPageOverlay: {
      backgroundColor: 'rgba(0,0,0,0.6)',
      position: 'absolute',
      top: 0,
      right: 0,
      width: '100%',
      height: '100%',
      zIndex: 700
  },
  downloadProgress: {
      fontSize: 24,
      fontFamily: 'Lora',
      color: 'white'
  },
  userbar: {
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'rgba(100,189,189,1)',
      zIndex: 800,
      padding: 10,
      ...Platform.select({
        android: {
            flexDirection: 'row',
        }
      }),
  },
  userBarText: {
      color: 'white'
  },
  frontPage: {
      flex: 1
  },

  //settings screen
  settingsContainer: {
    flex: 1,
  },
  settingsSection: {
    justifyContent: 'center',
    margin: 20,
  },
  settingsTextTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  settingsTextInput: {
    fontSize: 20,
    width: 175,
  },
  settingsSectionTitle: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 10,
  },
  settingsField: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },

  //login screen:
  loginContainer: {
    flex: 1,
  },
  loginContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  },
  loginInputContainer: {
    marginTop: 30,
    flex: 0.5,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  loginField: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  loginTextTitle: {
    // flex: 20,
    fontSize: 20,
  },
  loginTextInput: {
    // flex: 3,
    fontSize: 20,
    width: 200,
  },
  loginButtons: {
    marginTop: 20,
    flex: 0.4,
  },
  loginButtonContainer: {
    margin: 5,
  },
  loginButton: {
    padding: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 20,
  },

});

module.exports = styles;
