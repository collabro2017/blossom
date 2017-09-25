import React from 'react';
import {
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';

import Device from 'react-native-device-detection';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
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

  var loginInputWidth = 500;
  var loginInputHeight = 150;
  var smallMargin = 40;
  var commonMargin = 30;
  var loginButtonPadding = 20;

  var obwImageWidth = 240;
  var obwImageHeight = 388;

  var bookSize = {height: 320, width: 192};
  var thumbnailSize = {height: 234, width: 182};

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
  var loginInputHeight = 100;
  var smallMargin = 20;
  var commonMargin = 30;
  var loginButtonPadding = 10;

  var obwImageWidth = 120;
  var obwImageHeight = 194;

  var bookSize = {height: 250, width: 150};
  var thumbnailSize = {height: 180, width: 140};

  var iconSize = 30;
}

var propStyles = {
  iconSize: iconSize
};

var controlsColor = colors.primaryDark;
var controlsColorTranslucent = '#58391920';
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
    position: 'absolute',
    top: -4,
    zIndex: 10
  },
  fakeTopMenu : {
    width: '100%',
    height: 60
  },
  bottomMenu : {
    position: 'absolute',
    bottom: 6,
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
  topMenuCenterText : {
    fontSize: responsiveFontSize(2),
    fontFamily : 'Open Sans',
    color : controlsColor,
  },
  topMenuRight : {
    flex : 3,
    alignItems : 'center',
    justifyContent : 'center',
    paddingTop: 20
  },
  topMenuRightText : {
    fontSize: responsiveFontSize(1.5),
    fontFamily : 'Open Sans',
    color : controlsColor,
  },
  bigTitle : {
      fontFamily: 'Lora',
      fontSize: 40,
      marginBottom: 20
  },
  bookTitle : {
    fontFamily : 'Open Sans',
    color : controlsColor,
    fontSize : responsiveFontSize(1.5),
  },
  bookAuthor : {
    fontFamily : 'Open Sans',
    color : controlsColor,
    fontSize : responsiveFontSize(1),
    fontWeight : '600'
  },
  storeBook: {
    height: bookSize.height,
    width: bookSize.width,
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
  physicalBook : {
    marginLeft: 13,
    marginRight: 2,
    marginBottom: 25,
    marginTop: 10,
  },
  thumbnail: {
    height:thumbnailSize.height,
    width:thumbnailSize.width,
    borderWidth: 0,
    borderRadius: 7,
    borderColor: 'black',
    //overflow: 'hidden',
  },
  galleryContainer : {
      paddingBottom: 10,
      backgroundColor: colors.secondary,
      flex: 1
  },
  storeGalleryContainer : {
        paddingTop: 40,
        paddingBottom: 10,
        backgroundColor: colors.primary,
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
    fontSize: responsiveFontSize(1.7),
    color : controlsColor,
  },
  picker: {
    width: 125,
  },

  //details screen
  detailContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  detailTitle: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    padding: 20,
    zIndex: 2,
    shadowColor: 'black',
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowOffset: {
        height: 0,
        width: 0
      }
  },
  detailTitleRight: {
    margin: 20,
    flexWrap: 'wrap',
    flex: 0.6,
  },
  detailTitleBook: {
    fontSize: responsiveFontSize(3.2),
    fontWeight: 'bold',
    fontFamily: 'Lora',
    lineHeight: responsiveFontSize(3.2)
  },
  detailTitleText: {
    fontSize: responsiveFontSize(2.5),
    justifyContent: 'center',
    lineHeight: 30,
    fontFamily: 'Lora',
  },
  detailInfoText: {
    fontSize: responsiveFontSize(2),
    justifyContent: 'center',
    fontFamily: 'Open Sans'
  },
  detailInfoTitle: {
    fontSize: responsiveFontSize(2),
    color: colors.textOnSecondary
  },
  detailIconContainer: {
    flexDirection:'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailTitleContainer: {
    flexDirection:'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: colors.secondaryDark
  },
  backgroundTertiary: {
    backgroundColor: colors.tertiaryDark
  },
  backgroundQuaternary: {
    backgroundColor: colors.quaternaryDark
  },
  backgroundQuinary: {
    backgroundColor: colors.quinaryDark
  },
  colorPrimary: {
      color: colors.primaryDark
  },
  colorSecondary: {
      color: colors.secondaryDark
  },
  colorTertiary: {
      color: colors.tertiaryDark
  },
  colorQuaternary: {
      color: colors.quaternaryDark
  },
  colorQuinary: {
      color: colors.quinaryDark
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
  detailSection: {
      flexDirection: 'column',
      alignItems: 'stretch',
      marginBottom: 34,
  },
  sliderContainer: {
      borderRadius: 2,
      backgroundColor: colors.backgroundDark,
      padding: 20,
      maxWidth: 400,
  },
  detailInfoContainer: {
    justifyContent: 'center',
    margin: 10,
  },
  detailIcon: {
    marginRight: 20,
  },
  detailThumbnail: {
    borderRadius: 2,
    width: thumbnailSize.width,
    height: thumbnailSize.height,
    shadowColor: colors.primary,
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowOffset: {
        height: 0,
        width: 0
      }
  },
  detailMain: {
    flex: 1,
    padding: 20,
    alignItems:'stretch',
    backgroundColor: colors.background
  },
  detailScrollView: {
      backgroundColor: colors.background
  },
  detailBottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailTitleRating: {
    flexDirection:'row',
    marginTop: 10,
    marginBottom: 10,
  },
  detailButton: {
    backgroundColor: colors.textOnSecondary,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 2,
    textAlign: 'center',
  },
  detailButtonText: {
    color: colors.primaryDark,
    textAlign: 'center',
    fontSize: responsiveFontSize(2)
  },
  detailButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  detailLibraryButton: {
    backgroundColor: colors.textOnSecondary,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 2,
    textAlign: 'center',
  },
  detailSlider: {
    minWidth: 200,
  },
  detailSliderLabel: {
    alignItems:'center',
    borderWidth: 3
  },
  downloadOverlay: {
      backgroundColor: 'rgba(0,120,0,0.6)',
      height: thumbnailSize.height,
      width: thumbnailSize.width,
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
      backgroundColor: colors.tertiaryDark,
      zIndex: 800,
      padding: 10,
      flexDirection: 'row',
      shadowColor: "#000000",
      shadowOpacity: 0.6,
      shadowRadius: 2,
      shadowOffset: {
          height: 0,
          width: 0
        }
  },
  notificationBar: {
      position: 'absolute',
      top: 0
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
    flex: 1
  },
  loginContentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  loginInputContainer: {
    margin: commonMargin,
    height: loginInputHeight,
    width: loginInputWidth,
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
    fontSize: fontSizeM,
  },
  loginTextInput: {
    // flex: 3,
    fontSize: 20,
    width: 200,
  },
  loginButtons: {
    //marginTop: 20,
    flex: 1,
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
    //margin: commonMargin,
  },
  obwSection: {
    margin: smallMargin,
  },
  dismissableNotificationText: {
     color: colors.textOnSecondary,
     fontSize: responsiveFontSize(1.7),
     textAlign: 'left',
     flex: 1,
     paddingLeft: 8,
  },
  frontpageButtonLabel: {
     fontSize:responsiveFontSize(1.9),
     color:colors.textOnSecondary,
  },
  dropDownContainer: {
      backgroundColor: controlsColorTranslucent,
      paddingLeft: 6,
      paddingRight: 6,
      borderRadius: 2
  },
  swiperButtonText: {
      color: colors.primaryDark
  }
});
export {propStyles};
export {colors};
export default styles;
