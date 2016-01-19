var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Touchable
} = React;

var mixins = require('./Mixins.js');



var TextNode = React.createClass({
  getInitialState : function() {
    return {
      renderLang : this.props.renderLang
    };
  },
  render : function() {
      return (
        <Text
          ref={this.props.key}
          style={[styles.text, styles[this.state.renderLang + 'Text'], mixins.styleOverride(this.props.node)]}
          onPress={this.handleToggle}
        >{ this.props.node.content[this.state.renderLang] + ' '}</Text>
      );
  },
  handleToggle : function() {
    var nextLang = this.state.renderLang == 'L1' ? 'L2' : 'L1';
    this.setState({
      renderLang : nextLang
    });
  }
});

var styles = StyleSheet.create({
    text : {
      fontFamily: 'Lora',
      fontSize : 30,
      lineHeight : 40,
      // borderWidth : 3,
      // borderColor : 'teal'
    },
    L1Text : {
      color : '#231506'
    },
    L2Text : {
      color : '#528F6B'
    }

});

module.exports = TextNode;