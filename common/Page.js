var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Touchable
} = React;

var TextNode = require('./TextNode.js');
var mixins = require('./Mixins.js');

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
    return <Text key={'p'+i} style={[mixins.styleOverride(node), styles.paragraph]}>
      {this.renderContent(node.content)}
    </Text>
  },
  renderText : function(node, i) {
    var renderLang = node.blends[this.props.blend];
    return <TextNode
      renderLang={renderLang}
      node={node}
      key={'n' + i}
    ></TextNode>
  },
});

var styles = StyleSheet.create({
    container : {
      flexDirection : 'column',
      alignItems : 'stretch',
      flexWrap : 'wrap',
      paddingLeft : 40,
      paddingRight : 40,
      paddingTop : 50,
      paddingBottom : 50,
      // borderWidth : 3,
      // borderColor : 'pink',
    },
    paragraph : {
      flex : 1,
      flexDirection : 'row',
      justifyContent : 'flex-start',
      paddingBottom: 20,
      // borderWidth : 3,
      // borderColor : 'red',
    },
    text : {
      fontFamily: 'Lora',
      fontSize : 30,
      lineHeight : 40,
      // borderWidth : 3,
      // borderColor : 'green'
    },
    L1Text : {

    },
    L2Text : {
      color : 'navy'
    }

});

module.exports = Page;