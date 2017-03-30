

var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Touchable,
  Dimensions,
  PixelRatio,
} = ReactNative;

var React = require('react');
var {
    Component
} = React;

var mixins = require('./Mixins');

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const biggerSide = windowHeight > windowWidth ? windowHeight : windowWidth;

function sizeFont(size) {
    if(biggerSide > 1536) {
        return size * 1.25;
    }
    return size;
}

var COVER_FONT_SIZE = sizeFont(36);
var STORY_FONT_SIZE = sizeFont(15);
var STORY_LINE_HEIGHT = sizeFont(22);

var TextNode = React.createClass({
  _longTouch : 600,
  _touchStart : 0,
  componentWillReceiveProps: function(nextProps){
    this.setState({
      renderLang : nextProps.renderLang,
      isManualToggle : false
    });
  },
  getInitialState : function() {
    return {
      renderLang : false,
      isManualToggle : false,
    };
  },
  onTouchStart: function({nativeEvent: {locationX, locationY}}) {
    this._touchStart = new Date().getTime();
    setTimeout(this.autoLongTap, this._longTouch);
  },
  autoLongTap:function() {
    //if the touch has already ended
    if(!this._touchStart) {
      return;
    }

    this.onLongTap();
    this._touchStart = 0;
  },
  onTouchEnd: function({nativeEvent: {locationX, locationY}}) {
    if(this._touchStart == 0) {
      return;
    }
    let touchDuration = new Date().getTime() - this._touchStart;
    this._touchStart = 0;
    if(touchDuration < this._longTouch) {
      this.onShortTap();
    } else {
      this.onLongTap();
    }
  },
  onTouchCancel: function({nativeEvent: {locationX, locationY}}) {
    console.log('touch cancel');

    this._touchStart = 0;
  },
  _onTouch: function({nativeEvent: {locationX, locationY}}) {
    console.log(locationX, locationY);
  },
  render : function() {
    if(!this.state.renderLang)
    {
      return <Text> </Text>;
    }

    return (
      <Text
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => false}
        onResponderGrant={this.onTouchStart}
        onResponderRelease={this.onTouchEnd}
        onResponderTerminationRequest={() => true}
        onResponderTerminate={this._onTouch}
        ref="myself"
        style={this.state.isManualToggle ?
        [styles.text, styles[this.state.renderLang + 'Text'], styles.manualToggle, mixins.styleOverride(this.props.node)] :
        [styles.text, styles[this.state.renderLang + 'Text'], mixins.styleOverride(this.props.node)]
        }
      >{ this.props.node.content[this.state.renderLang] }</Text>
    );
  },
  onShortTap : function() {
    if(this.props.node.content.L1 == this.props.node.content.L2) {
      return;
    }

    var nextLang = this.state.renderLang == 'L1' ? 'L2' : 'L1';
    this.setState({
      renderLang : nextLang,
      isManualToggle : !this.state.isManualToggle
    });
  },
  onLongTap : function() {
    let l = (this.state.renderLang == 'L1') ? 'en-US' : 'es-MX';
    let t = this.props.node.content[this.state.renderLang];
    mixins.speak(
      t,
      l
    );
  }
});

var styles = StyleSheet.create({
    text : {
      fontFamily: 'Lora',
      fontSize : STORY_FONT_SIZE,
      lineHeight : STORY_LINE_HEIGHT,
      // borderWidth : 3,
      // borderColor : 'teal'
    },
    L1Text : {
      color : '#231506'
    },
    L2Text : {
      color : '#528F6B'
    },
    manualToggle : {
      color : '#BF5F2D'
    }

});

module.exports = TextNode;
