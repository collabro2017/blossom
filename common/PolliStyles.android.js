import React from 'react';
import {
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';

import Device from 'react-native-device-detection';

import * as PolliCommon from './PolliCommon';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const colors = PolliCommon.colors;

if (Device.isTablet) {
  //Tablet specific styles
  var logoHeight = 223;
  var logoWidth = 500;

  var fontSizeXL = 64;
  var fontSizeL = 40;
  var fontSizeM = 32;
  var fontSizeS = 26;

  var loginInputWidth = 600;
  var loginInputHeight = 80;
  var loginTextInputWidth = 350;
  var smallMargin = 40;
  var commonMargin = 100;
  var loginButtonPadding = 20;

  var obwImageWidth = 240;
  var obwImageHeight = 388;

  var iconSize = 50;
} else {
  //Phone specific styles
  var logoHeight = 100;
  var logoWidth = 225.15;

  var fontSizeXL = 40;
  var fontSizeL = 32;
  var fontSizeM = 20;
  var fontSizeS = 14;

  var loginInputWidth = 300;
  var loginInputHeight = 70;
  var loginTextInputWidth = 200;
  var smallMargin = 20;
  var commonMargin = 30;
  var loginButtonPadding = 10;

  var obwImageWidth = 120;
  var obwImageHeight = 194;

  var iconSize = 30;
}

var propStyles = {
  iconSize: iconSize
};

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
    fontSize : 14,
  },
  bookAuthor : {
    fontFamily : 'Open Sans',
    color : controlsColor,
    fontSize : 9,
    fontWeight : '600'
  },
  physicalBook : {
    marginLeft: 13,
    marginRight: 2,
    marginBottom: 25,
    marginTop: 10,
  },
  thumbnail: {
    height:180,
    width:140,
    borderWidth: 0,
    borderBottomRightRadius: 7,
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 2,
    borderTopLeftRadius: 2,
  },
  galleryContainer : {
      paddingBottom: 10,
      backgroundColor: 'rgba(230,216,189,1)',
      flex: 1
  },

  galleryShelfTitle: {
    marginTop: 10,
    //marginBottom:15,
    marginLeft:15,
  },
  galleryShelfTitleText: {
    fontWeight:'bold',
  },

  galleryShelfTopContainer: {
    flexDirection:'row',
  },
  galleryShelfTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 9,
    borderTopWidth: 9,
    borderRightColor: 'transparent',
    borderTopColor: '#61300d',
    transform: [
      {rotate: '180deg'}
    ],
  },
  galleryShelfTop: {
    height:9,
    width:windowWidth,
    backgroundColor:'#61300d',
  },

  galleryShelfRectangle: {
    backgroundColor:'#8B4513',
    height:15,
    borderColor: '#61300d',
    borderTopWidth: 1,
    marginBottom: 10,
  },

  galleryFlatList: {
    marginBottom:-30,
    zIndex:2,
  },

  storeGalleryContainer : {
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: 'rgba(100,189,189,1)',
    flex: 1,
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
    fontSize: 11,
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
    flex: 1,
    alignItems: 'center',
    margin: 30,
  },
  loginInputContainer: {
    margin: commonMargin,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  loginField: {
    // flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    height: loginInputHeight,
    width: loginInputWidth,
  },
  loginTextTitle: {
    // flex: 20,
    fontSize: fontSizeM,
  },
  loginTextInput: {
    // flex: 3,
    fontSize: fontSizeM,
    width: loginTextInputWidth,
  },
  loginButtons: {
    //marginTop: 20,
    flex: 0.4,
  },
  loginButtonContainer: {
    margin: 5,
  },
  loginButton: {
    padding: loginButtonPadding,
  },
  loginButtonText: {
    color: 'white',
    fontSize: fontSizeM,
  },
  loginSignUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  loginSignUpText: {
    fontSize: fontSizeM,
  },
  loginSignUpLink: {
    color: '#008000',
    fontSize: fontSizeM,
  },
  loginLogo: {
    marginTop: commonMargin,
    height: logoHeight,
    width: logoWidth,
  },

  //Onboarding Wizard screens:
  obwContainer: {
    flex: 1,
    margin: smallMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  obwTitle: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: fontSizeL,
  },
  obwLogo: {
    height: logoHeight,
    width: logoWidth,
  },
  obwText: {
    margin: smallMargin,
    fontSize: fontSizeM,
    textAlign: 'center',
  },
  obwSmallText: {
    flex: 1,
    margin: smallMargin,
    fontSize: fontSizeS,
    textAlign: 'center',
  },
  obwImageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  obwImage: {
    height: obwImageHeight,
    width: obwImageWidth,
  },
  obwButtonText: {
    color: 'white',
    fontSize: fontSizeM,
  },
  obwButton: {
    padding: 10,
  },
  obwButtonContainer: {

  },
  obwSection: {
    marginTop: smallMargin,
    justifyContent: 'center',
  },
});
export {propStyles,colors};
export default styles;
