var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Touchable,
  Image,
  ListView,
  Dimensions
} = ReactNative;

var React = require('react');
var {
    Component
} = React;

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const smallerSide = windowHeight < windowWidth ? windowHeight : windowWidth;

var TextNode = require('./TextNode.js');
var mixins = require('./Mixins');
import FitImage from 'react-native-fit-image';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isPortraitOrientation: true };
  }
  setStyleToOrientation(event) {
      this.setState({
        isPortraitOrientation: event.nativeEvent.layout.height >= event.nativeEvent.layout.width,
      });
  }
  renderContent(content) {
    var words = content.map( (node, index) => {
      switch(node.type.toLowerCase()) {
        case 'paragraph':
          return this.renderParagraph(node, index);
        case 'image':
          return this.renderImage(node, index);
        case 'text':
          return this.renderText(node, index);
        default:
          return <Text key={'n'+index}>..Unknown node type..</Text>
      }
    } );
    return words;
  }
  renderParagraph(node, i) {
    return <Text key={'n'+i} style={[styles.paragraph, mixins.styleOverride(node)]}>
      {this.renderContent(node.content)}
    </Text>
  }
  renderImage(node, i) {
    return <FitImage
      key={'n' + i}
      style={[styles.image, mixins.styleOverride(node)]}
      resizeMode={'contain'}
      source={{ uri: node.src }} />
  }
  renderText(node, i) {
    var renderLang = node.blends[this.props.blend];
    return <TextNode
      renderLang={renderLang}
      node={node}
      key={'n' + i}
      onToast={this.props.onToast}
    ></TextNode>
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderContent(this.props.page)}
      </View>
    );
  }
};

function getStoryTextSize() {
    /*if (Device.isIpad()) {
        return 30;
    } else {*/
        return 18;
    //}
}

function getStoryLineHeight() {
    /*if (Device.isIpad()) {
        return 40;
    } else {*/
        return 22;
    //}
}

var styles = StyleSheet.create({
    container : {
      flexDirection : 'column',
      alignItems : 'stretch',
      flexWrap : 'nowrap',
      paddingLeft : 40,
      paddingRight : 40,
      paddingTop : 50,
      paddingBottom : 50,
      flex: 1
      // borderWidth : 3,
      // borderColor : 'pink',
    },
    landscapeContainer: {
        flexDirection : 'row',
        alignItems : 'stretch',
        flexWrap : 'nowrap',
        paddingLeft : 40,
        paddingRight : 40,
        paddingTop : 50,
        paddingBottom : 50,
    },
    paragraph : {
      flexGrow : 1,
      flexDirection : 'row',
      justifyContent : 'flex-start',
      paddingBottom: 20,
      // borderWidth : 3,
      // borderColor : 'red',
    },
    image : {
        maxWidth: smallerSide * 0.8,
        flexShrink: 3
    },
    text : {
      fontFamily: 'Lora',
      fontSize : getStoryTextSize(),
      lineHeight : getStoryLineHeight(),
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
