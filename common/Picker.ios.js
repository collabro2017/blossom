
import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';

import Picker from 'react-native-picker';

export default class GeneralPicker extends Component {

  constructor(props){
    super(props);
    var pickerOptions = props.pickerOptions;
    Picker.init({
      pickerData: this.getBlendLabels(pickerOptions),
      pickerTitleText: "Select from options",
      selectedValue: [pickerOptions[props.selected]],
      onPickerConfirm: (data) => {
        Object.keys(pickerOptions).map(function(key) {
            if (pickerOptions[key] == data){
              this.props.onValueChange(key);
            }
        }.bind(this));
      }
    });
    Picker.hide();
  }

  getBlendLabels(pickerOptions) {
    return Object.keys(pickerOptions).map(function(key) {
        return pickerOptions[key];
    });
  }

  render() {
    var pickerOptions = this.props.pickerOptions;
    return (
      <Text style={styles.bottomMenuLabels} onPress={()=>{ Picker.show(); }}>
        {pickerOptions[this.props.selected]}
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
