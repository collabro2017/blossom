import React from 'react';
import {
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';

import Device from 'react-native-device-detection';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ColorLuminance(hex, lum) {

	// validate hex string
    console.log('original color', hex);
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

    console.log(rgb);

	return rgb;
}

const colors = {
    primary: '#FFB339',
    primaryDark: ColorLuminance('#FFB339', -0.25),
    primaryLight: ColorLuminance('#FFB339', 0.25),
    secondary: '#199C95',
    secondaryDark: ColorLuminance('#199C95', -0.25),
    secondaryLight: ColorLuminance('#199C95', 0.25),
    tertiary: '#FA2F2F',
    tertiaryDark: ColorLuminance('#FA2F2F', -0.25),
    tertiaryLight: ColorLuminance('#FA2F2F', 0.25),
    quaternary: '#A6DE3E',
    quaternaryDark: ColorLuminance('#A6DE3E', -0.25),
    quaternaryLight: ColorLuminance('#A6DE3E', 0.25),
    quinary: '#FFB339',
    quinaryDark: ColorLuminance('#FFB339', -0.25),
    quinaryLight: ColorLuminance('#FFB339', 0.25),
    textOnPrimary: 'black',
    textOnSecondary: 'white',
    background: '#F5F5F6',
    backgroundDark: '#E1E2E1',
};

export {colors};
