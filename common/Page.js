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
            {this.renderPage()}
      </View>
    );
  },
  renderPage : function() {
    return this.props.content.nodes.map( (node, index) => {
      if(node.type == 'text') {
        return <View key={'n' + index} stye={[styles[node.type + 'Node']]}>
          <Text style={styles.node}>
            {this.renderNode(node.content, index)}
          </Text>
        </View>
      }

      return <View>
        <Text>..Unknown node type..</Text>
      </View>;
    } );
  },
  renderNode : function(content, n) {
    return S(content.en).trim().split(' ').map( function(word, index){
      console.log(word);
        return <Text key={'n' + n + 'w' + index}>{word} </Text>
    });
  }
});

var styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        justifyContent : 'flex-start',
        flexWrap : 'wrap'
    },
    node : {
      fontFamily: 'Lora',
      fontSize : 30,
      lineHeight: 40
    },
    textNode : {

    }

});

module.exports = Page;