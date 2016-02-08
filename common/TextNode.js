var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Touchable
} = React;

var mixins = require('./Mixins.js');



var TextNode = React.createClass({
  componentWillReceiveProps: function(nextProps){
    this.setState({
      renderLang : nextProps.renderLang,
      isManualToggle : false
    });
  },
  getInitialState : function() {
    return {
      renderLang : false,
      isManualToggle : false
    };
  },
  render : function() {
    if(!this.state.renderLang)
    {
      return <Text> </Text>;
    }

    return (
      <Text
        ref={this.props.key}
        style={this.state.isManualToggle ?
        [styles.text, styles[this.state.renderLang + 'Text'], styles.manualToggle, mixins.styleOverride(this.props.node)] :
        [styles.text, styles[this.state.renderLang + 'Text'], mixins.styleOverride(this.props.node)]
        }
        onPress={this.handleToggle}
      >{ this.props.node.content[this.state.renderLang]}</Text>
    );
  },
  handleToggle : function() {
    var nextLang = this.state.renderLang == 'L1' ? 'L2' : 'L1';
    this.setState({
      renderLang : nextLang,
      isManualToggle : !this.state.isManualToggle
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
    },
    manualToggle : {
      color : '#BF5F2D'
    }

});

module.exports = TextNode;