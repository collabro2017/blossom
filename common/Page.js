var React = require('react-native');


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
        return <View key={index} stye={[styles[node.type + 'Node']]}>
          <Text style={styles.node}>{node.content.en} </Text>
        </View>
      }

      return <View>
        <Text>..Unknown node type..</Text>
      </View>;
    } );
  }
});

var styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        justifyContent : "flex-start"
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