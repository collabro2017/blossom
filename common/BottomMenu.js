var React = require('react-native');


var {
  StyleSheet,
  Text,
  View,
} = React;

var BottomMenu = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
            <Text>bottom menu</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
    container : {
        justifyContent : "space-between"
    }
});


module.exports = BottomMenu;