var React = require('react-native');


var {
  StyleSheet,
  Text,
  View,
} = React;

var Book = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
            <Text>book</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
    container : {
        justifyContent : "space-between"
    }
});

module.exports = Book;