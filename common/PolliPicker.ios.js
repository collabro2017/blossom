import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import Picker from 'react-native-picker';
import styles from "./PolliStyles";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class PolliPicker extends Component {

  constructor(props){
    super(props);
    Picker.init({
      pickerData: this.getBlendLabels(),
      pickerTitleText: "Select language blend",
      pickerConfirmBtnText: "OK",
      pickerCancelBtnText: "Cancel",
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
        <View style={styles.dropDownContainer}>
          <Text style={styles.bottomMenuLabels} onPress={()=>{ Picker.show(); }}>
            {global.currentBook.blends[this.props.blend]} <Icon name="chevron-down" size={16} />
          </Text>
        </View>
    )
  }
}
