var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Touchable
} = React;

var S = require('string');


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
          style={this.getStyle(this.props.node, [styles.text, styles[this.state.renderLang + 'Text']])}
          onPress={this.handleToggle}
        >{ this.props.node.content[this.state.renderLang] + ' '}</Text>
      );
  },
  getStyle : function(node, defaultStyle) {
    if(!node.style) {
      return defaultStyle;
    }

    return defaultStyle.concat( node.style );
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

    },
    L2Text : {
      color : 'navy'
    }

});

module.exports = TextNode;