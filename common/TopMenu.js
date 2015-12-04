'use strict';

var React = require('react-native');
var {
  Animated,
  LayoutAnimation,
  Image,
  PixelRatio,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} = React;

var SPRING_CONFIG = {tension: 2, friction: 3};

var TopMenu = React.createClass({
    getInitialState: function() {
        return {
            anim: new Animated.ValueXY(),
            style: {
                top : 0
            }
        };
    },

    onPress: function() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
        this.setState({
            style : {
                top : -56
            }
        });
        // Animated.spring(this.state.anim, {
        //     ...SPRING_CONFIG,
        //     toValue: {x: 0, y: -56}                        // return to start
        // }).start();
    },

    getStyle: function() {
        console.log(this.state.anim.getTranslateTransform());
        return [
                  styles.menu,
                  this.state.style
                ];
      },

    render: function() {
        var TouchableElement = TouchableHighlight;
        if (Platform.OS === 'android') {
         TouchableElement = TouchableNativeFeedback;
        }

        return (
            <Animated.View>
                <TouchableElement style={this.getStyle()}
                    onPress={this.onPress}>
                    <Text style={styles.menuText}>
                        Top Menu
                    </Text>
                </TouchableElement>
            </Animated.View>
        );
    }
});

var styles = StyleSheet.create({
    menu: {
        flex : 1,
        position : "absolute",
        top : 0,
        left : 0,
        right : 0,
        height : 56,
        backgroundColor : "rgba(214,238,255,0.85)",
        justifyContent : 'center',
        alignItems : 'center',
    },

    menuText: {
        fontSize: 20,
        color: "#6C7A89",
        lineHeight: 27
    }
});

module.exports = TopMenu;