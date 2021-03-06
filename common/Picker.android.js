import React, { Component } from 'react';
import {
  Picker,
  StyleSheet,
} from 'react-native';

export default class PolliPicker extends Component {
  render () {
    var items = [];
    var pickerOptions = this.props.pickerOptions;

    Object.keys(pickerOptions).map(function(key) {
      items.push(<Picker.Item label={pickerOptions[key]} value={key} />);
    });
    return (
      <Picker
        style={styles.picker}
        selectedValue={this.props.selected}
        onValueChange={(key)=>{this.props.onValueChange(key)}}
        mode="dropdown"
        enabled={this.props.enabled}>

        {items}

      </Picker>
    )
  }
}

var styles = StyleSheet.create({
  picker: {
    width: 110,
  },
});
