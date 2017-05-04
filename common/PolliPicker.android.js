import React, { Component } from 'react';
import {
  Picker,
  StyleSheet,
} from 'react-native';

import styles from './PolliStyles';

export default class PolliPicker extends Component {
  render () {
    var items = [];
    Object.keys(global.currentBook.blends).map(function(key) {
      items.push(<Picker.Item label={global.currentBook.blends[key]} value={key} />);
    });
    return (
      <Picker
        style={styles.picker}
        selectedValue={this.props.blend}
        onValueChange={(key)=>{this.props.onValueChange(key)}}
        mode="dropdown">

        {items}

      </Picker>
    )
  }
}
