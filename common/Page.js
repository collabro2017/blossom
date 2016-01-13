var React = require('react-native');
var S = require('string');

var {
  StyleSheet,
  Text,
  View,
  Touchable
} = React;

var Page = React.createClass({
  render : function() {
    return (
      <View style={styles.container}>
        {this.renderContent(this.props.page)}
      </View>
    );
  },
  renderContent : function(content) {
    var words = content.map( (node, index) => {
      switch(node.type.toLowerCase()) {
        case 'paragraph':
          return this.renderParagraph(node, index);
        case 'text':
          return this.renderText(node, index);
        default:
          return <Text>..Unknown node type..</Text>
      }
    } );
    return words;
  },
  renderParagraph : function(node, i) {
    return <Text key={'p'+i} style={this.getStyle(node, [styles.paragraph])}>
      {this.renderContent(node.content)}
    </Text>
  },
  renderText : function(node, i) {
    return <Text key={'n' + i} style={this.getStyle(node, [styles.text])}>{node.content.en} </Text>
  },
  getStyle : function(node, defaultStyle) {
    console.log(node, node.style);
    if(!node.style) {
      return defaultStyle;
    }

    return defaultStyle.concat( node.style );
  }
});

var styles = StyleSheet.create({
    container : {
      flexDirection : 'column',
      alignItems : 'stretch',
      flexWrap : 'wrap',
      // borderWidth : 3,
      // borderColor : 'yellow'
    },
    paragraph : {
      flex : 1,
      flexDirection : 'row',
      justifyContent : 'flex-start',
      paddingBottom: 20
      // borderWidth : 3,
      // borderColor : 'black',
    },
    text : {
      fontFamily: 'Lora',
      fontSize : 30,
      lineHeight : 40,
      // borderWidth : 3,
      // borderColor : 'teal'
    }
});

module.exports = Page;