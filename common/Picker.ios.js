import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';

import Picker from 'react-native-picker';

export default class PolliPicker extends Component {

  constructor(props){
    super(props);
    Picker.init({
      pickerData: this.getBlendLabels(),
      pickerTitleText: "Select language blend",
      selectedValue: [global.currentBook.blends[this.props.blend]],
      onPickerConfirm: (data) => {
        Object.keys(global.currentBook.blends).map(function(key) {
            if (global.currentBook.blends[key] == data){
              this.props.onValueChange(key);
            }
        }.bind(this));
      }
    });
    Picker.hide();
  }

  getBlendLabels() {
    return Object.keys(global.currentBook.blends).map(function(key) {
        return global.currentBook.blends[key];
    });
  }

  render() {
    return (
      <Text style={styles.bottomMenuLabels} onPress={()=>{ Picker.show(); }}>
        {global.currentBook.blends[this.props.blend]}
      </Text>
    )
  }
}

var styles = StyleSheet.create({
  bottomMenuLabels : {
    fontFamily : 'Open Sans',
    fontSize: 11,
    color : '#583919',
  },
});
