var React = require('react-native');
var Overlay = require('react-native-overlay');
var Icon = require('react-native-vector-icons/EvilIcons');


var {
  View,
  ActivityIndicatorIOS,
  StyleSheet,
  TouchableOpacity,
  Text,
} = React;

var mixins = require('./Mixins.js');


type Props = {
  isVisible: boolean;
}

var Toast = React.createClass({
  playPhrase : function() {
    //TODO: of course the language shouldn't be hardcoded
    mixins.speak(
      this.props.node.L2,
      'es-MX'
    );
  },
  render(): ReactElement {
    var positionStyle;

    if (this.props.position == 'top' || !this.props.position) {
      positionStyle = styles.top;
    } else {
      positionStyle = styles.bottom;
    }

    if(!this.props.node) {
      return(
        <Overlay isVisible={this.props.isVisible} aboveStatusBar={false}></Overlay>
      );
    }

    return (
      <Overlay isVisible={this.props.isVisible} aboveStatusBar={false}>
        <View style={[positionStyle, styles.toast]}>
          <View style={styles.content}>
            <TouchableOpacity style={styles.textWrapper} onPress={this.playPhrase}>
              <Icon name="play" size={50} style={styles.buttonText} />
              <Text style={styles.toastText}>{this.props.node.L2} => {this.props.node.L1}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={this.props.onDismiss}>
            <View style={styles.dismissButton}>
              <Icon name="arrow-down" size={50} style={styles.buttonText} />
            </View>
          </TouchableOpacity>
        </View>
      </Overlay>
    );
  }
});

var styles = StyleSheet.create({
  top: {
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 9,
    alignItems: 'center',
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth : 3,
    // borderColor : 'green',
  },
  toast: {
    height: 50,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: '#6D5236',
    borderTopColor: '#F5F2DE',
    borderTopWidth: 2
  },
  toastText: {
    color: '#ffffff',
    padding: 15,
    backgroundColor: 'transparent',
    fontSize: 14,
    // borderWidth : 3,
    // borderColor : 'red',
  },
  dismissButton: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    height: 30,
    marginRight: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 40,
  },
})

module.exports = Toast;